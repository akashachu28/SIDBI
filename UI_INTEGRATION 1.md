# UI integration guide

For the people building the web or mobile UI on top of the Mialo MSME Navigator API.

**Files to share:** this guide and `docs/openapi.json` (the full API description). A `localhost` Swagger link works
only on the machine that runs the API, so share the file, not the link.

- **Postman or Insomnia:** import `openapi.json` and every endpoint appears, with request bodies.
- **Typed client:** `npx openapi-typescript docs/openapi.json -o api.ts`, or use `orval` or `openapi-generator`.
- **Mock without a backend:** `npx @stoplight/prism-cli mock docs/openapi.json`.
- **Run the real thing:** the whole backend starts with `docker compose up -d` (see `docs/LOCAL_DEV.md`). Set
  `MIALO_LLM_ENABLED=false` and no model is needed: every result is the same, and the wording is template-based.

## 1. Basics

| | |
|---|---|
| Base URL | `http://localhost:8000/api/v1` locally; use the shared URL when there is one |
| Interactive docs | `/docs` (Swagger), `/openapi.json` |
| Format | JSON in, JSON out. **Money is whole rupees** (5000000 means INR 50 lakh); format it in the UI |
| CORS | Open (`*`), so a browser app on any origin can call it. Tokens travel in a header, never cookies |
| Auth | `POST /businesses {"name": "..."}` returns `{business_id, access_token, token_type}`. Send `Authorization: Bearer <token>` on every other call. The token lasts 8 hours; the demo has no login screen |
| Open calls | `GET /services`, `GET /health`, `POST /businesses`, `POST /auth/demo-token {"business_id"}` (returning user) |

**Errors** come in two shapes. Handle both.

```json
{"error": {"code": "conflict", "message": "Required profile fields are missing", "details": {"gate": {"missing_required": [ ... ]}}}}
{"detail": [{"loc": ["body", "text"], "msg": "Input should be a valid string", "type": "string_type"}]}
```

The first is every business-rule error: `not_found` 404, `forbidden` 403 (bad or expired token: send the user back to
start), `conflict` 409 (usually "required fields missing": `details.gate.missing_required` lists the questions to
ask), `validation_failed` 422 (`details.allowed` lists the valid values). The second is a malformed request body.

**Data labels.** Every record has `data_status`. All of it is `synthetic_demo` today: show a small "Demo data" tag
wherever a scheme, rule, tender or expert is shown.

## 2. Screens and the calls behind them

| Screen | Calls |
|---|---|
| Start | `POST /businesses`, `GET /services` (`status` is `active` or `coming_soon`) |
| "What do you need?" box | `POST /intake/query`, then `POST /intake/answer`; `GET /intake/questions` to resume |
| Business details form | `GET /services/{id}/requirements` builds the form, `PUT /businesses/{id}/profile` saves it |
| Upload documents | `GET /documents/types`, `POST /documents`, `POST /documents/{id}/confirm`, `DELETE /documents/{id}` |
| Readiness and loan options | `POST /journeys/funding/run` |
| Scheme list | same response (`schemes.groups`) |
| Scheme page and bookmarks | `GET /schemes/{id}`, `POST /bookmarks`, `GET /bookmarks`, `DELETE /bookmarks/{scheme_id}` |
| Compliance | `POST /journeys/compliance/run` |
| Tenders | `GET /tenders`, `GET /tenders/{id}` |
| Action plan | `POST /action-plans` (build or refresh), `GET /action-plans`, `PATCH /tasks/{id}` |
| Experts and referral | `GET /experts`, `GET /experts/recommended`, `POST /referrals/draft`, `POST /referrals/{id}/submit` |
| Ask a question | `POST /knowledge/search` (cited answer) |
| Progress | `GET /analytics/business-summary` |
| "Results are out of date" banner | `GET /journeys/{service}/latest` returns `stale: true` after the profile changes |

## 3. The main flow

### 3.1 Goal box and follow-up questions (no model involved)

`POST /intake/query {"text": "I want a loan of 50L for expanding my factory"}` saves nothing. It returns what it
understood and what to ask next:

```json
{
  "proposals": [{"key": "funding_amount_inr", "label": "Amount needed", "value": 5000000, "state": "proposed", "already_saved": false},
                {"key": "funding_purpose", "label": "Purpose", "value": "expansion", "state": "proposed", "already_saved": false}],
  "questions": [{"id": "components", "field": "project_components", "prompt": "Which parts does the project include? Choose all that apply.",
                 "type": "multi", "options": [{"value": "green_energy", "label": "Solar, energy-efficient or other green upgrades (green finance)"}],
                 "optional": false, "skip_label": null, "why": "Some schemes support only certain parts of a project, for example green upgrades.",
                 "affects": [{"scheme_id": "...", "name": "..."}], "affects_count": 3}],
  "preview": {"counts": {"meets_criteria": 3, "needs_info": 12, "does_not_meet": 20}, "facility_type": "equipment_term_loan"},
  "ready_for_assessment": false,
  "next_step": "answer_questions"
}
```

- Show `proposals` as editable chips ("You asked for INR 50 lakh for expansion. Correct?"). **They are not saved.**
- Question `type`: `single`, `multi`, `yes_no`, `number`. Optional ones carry `skip_label` (for example "Prefer not to say"): send
  `state: "unknown"` for it. `why` is the helper text; `affects` is "this answer changes N schemes".
- Save with `POST /intake/answer {"answers": [{"field": "funding_purpose", "value": "expansion"}, {"field": "stage", "state": "unknown"}]}`.
  The response has the same shape (remaining `questions`, a new `preview`, `next_step`). The preview counts update live.
- `next_step` tells the UI where to go: `answer_questions` (keep asking), `provide_missing` (a required goal answer was "unknown"),
  `complete_profile` (business details form), `run_assessment` (call the funding run).

### 3.2 Business details form (driven by the data, not hard-coded)

`GET /services/finance/requirements` returns `missing_required`, `missing_optional`, `unknown`, `complete`, `can_start`.
Each entry describes one input:

```json
{"key": "udyam_registered", "label": "Udyam registered", "type": "bool", "values": [], "why_asked": "...", "question": "Do you have a Udyam registration?", "value": null, "state": null}
```

Render by `type`: `string`, `int`, `number`, `money`, `bool`, `enum` (one of `values`), `multi_enum` (several of `values`; send a list).
Save with `PUT /businesses/{id}/profile {"fields": [{"key": "...", "value": ...}]}`; "I don't know" is `{"key": "...", "state": "unknown"}`.
The response lists every field with its `state` (`user`, `confirmed`, `extracted`, `corrected`, `unknown`), the `derived` values
(for example enterprise class and years in operation) and `changed_keys`. A new field can be added in the data without a UI change.

### 3.3 Documents

Eight document types can be uploaded, in two groups (`category`): **Core documents** (bank statements, latest balance sheet, income tax
returns, GST returns, Udyam certificate) and **Supporting documents** (GST registration certificate, existing loan statements or sanction
letters, export documents). Each has its own weight, and the weights differ by loan type.

`GET /documents/types` lists them with how much each is worth for this loan type: `importance_points`, `current_points`, `gain_available`,
`state`, and per item the `tiers` table (for example for bank statements "3 months 6.25 pts, 12 months 20 pts"). `state` is
`backed_by_document`, `stated_only` (the user said they have it but nothing is uploaded), `not_provided`, or `conditional`: export documents
count only for businesses that export, so until then they show `conditional` with `condition: "Export-oriented business"` and no points. Show
the list sorted as returned, so the top entries are the "upload this next" prompts. Before a loan purpose is chosen it returns a `note` and no
importance.

`POST /documents {"text": "..."}`

- **The API takes text** (there is no PDF or image reading yet): send pasted or extracted text. All eight types are recognised from the text; the
  response says which (`doc_type`) and proposes the values it read. If a document cannot be recognised, send `doc_type` and, if needed, the values
  the user read off it as `declared` (for example `{"doc_type": "gst_returns", "declared": {"gst_returns_months": 6}}`).
- It returns `{id, doc_type, fields: [{key, value, confidence, maps_to, ...}], needs_review}`. **Nothing is used until the user confirms.** Fields with
  a `maps_to` back a profile fact and are the ones to confirm; the others (totals, names, amounts) are shown for information. Let the user correct a
  value, then `POST /documents/{id}/confirm {"confirm": ["bank_statement_months"], "corrections": {"key": value}}`.
- A confirmed document-backed fact earns full points; a fact the user only typed earns half. That is why `evidence` on each readiness item is
  `document` or `self_reported`: show a small "backed by a document" mark.
- Uploading export documents marks the business as an exporter, which adds the export item to the score.

### 3.4 Results

`POST /journeys/funding/run {}` (409 with `details.gate` if required details are missing) returns:

| Key | Contents |
|---|---|
| `readiness` | `index` (0 to 100), `band` (`Early`, `Partly ready`, `Mostly ready`), `max_if_unknown_confirmed`, `documents_would_add`, `skipped_items` (items left out because they do not apply yet, such as export documents for a business not known to export; each has a `condition` and `reason`), `weight_scale`, `dimensions[].items[]` (`status` `met`/`partial`/`missing`/`unknown`, `points`, `weight`, `evidence`, `tiers`, `next_tier`), `blockers`, `next_actions[]` (`kind` `fix`/`confirm`/`document`, `gain`), `disclaimer` |
| `readiness_explanation` | `{summary, source}`; `source` is `model` or `template` |
| `schemes` | `groups.meets_criteria`, `groups.needs_info`, `groups.does_not_meet`, `counts`, `unavailable` (superseded or inactive schemes), `note` |
| `schemes_explanation` | `{summary, source}` |
| `loan_options` | the same group structure, for loan products |
| `data_status_summary` | for example `["synthetic_demo"]` |

A scheme card has `scheme_id`, `name`, `issuer`, `type`, `summary`, `outcome` (`match`, `unknown`, `fail`), `benefit`, `met[]` and `not_met[]`
(plain-language criteria), `questions[]` (what to ask to settle the unknowns), and `docs[]` (`on_hand`, `missing`, `unknown`).
The funding run recomputes everything from the saved profile: call it again after any change.

**Stale results.** When the profile changes, saved results become stale. `GET /journeys/finance/latest` returns
`{run_id, status, stale, profile_version, results}`: show "Your answers changed. Update your results" when `stale` is true.

### 3.5 Scheme page

`GET /schemes/{id}` returns `overview`, `benefits`, `eligibility.criteria[]` (each with `label`, `outcome` `met`/`not_met`/`unknown`, `actual`,
`expected`, `remedy`), `documents[]`, `official_url`, and the practical detail: `terms_summary`, `processing_time`, `contact`,
`validity_text`, `how_to_apply[]` (ordered steps), `conditions_to_check[]` (conditions the user judges by hand), `faq[]` (`question`, `answer`)
and `source_note`. Excerpts carry `source_id` and `publisher` for a "Source" line.

### 3.6 Compliance, tenders, plan, experts

- **Compliance** `POST /journeys/compliance/run {}`: `groups` are `to_do`, `confirm` (applies; ask whether it is already held), `needs_info`,
  `done`, `not_applicable`. Each item has `why[]`, `questions[]`, `remedy`, `mandatory`, and `details` (validity, portal, deadline, frequency,
  penalty, documents, verification, governing law, notes).
- **Tenders** `GET /tenders`: only open tenders, soonest first within `fit` (`meets_checkable`, `needs_info`, `gaps`). Qualification `status`
  is `met`, `not_met`, `unknown` or `manual` (the user checks by hand). Includes `days_left`, EMD, MSME exemption, description, delivery
  period, payment terms. `GET /tenders/{id}` adds the `proposal_checklist`. Tender ids contain slashes; use them as they are.
- **Plan** `POST /action-plans` returns `{tasks, progress: {done, total}}`; each task has `title`, `rationale`, `priority`, `window`, `depends_on`,
  `status`. `PATCH /tasks/{id} {"status": "todo" | "in_progress" | "done"}`. Rebuilding keeps the user's progress.
- **Experts** `GET /experts?topic=compliance&kind=desk`; `GET /experts/recommended` returns topics with a `reason` and suggested experts.
  The directory is a demo: show "Demo directory, not verified". Phone and email are never in the API.
- **Referral** `POST /referrals/draft {"category", "question", "expert_id"}` returns a `preview` of exactly what would be shared. Show it, ask for
  consent, then `POST /referrals/{id}/submit {"consent_granted": true}`. In the demo nothing leaves the system (`submitted_externally: false`).

## 4. Rules the UI should follow

- **Wording.** Say "meets the published criteria", never "eligible" or "approved". The readiness index is an "indicative evidence index", never a
  credit score. Always show the API's `disclaimer`. Do not turn `needs_info` into a failure: it means "tell us more", with the questions provided.
- **Unknown is a valid answer.** Offer "I don't know" on every question; the system turns it into a follow-up, never a guess.
- **Explain, do not just score.** Show `met` and `not_met`, the `next_actions`, and the points a document would add.
- **Waiting.** Funding and compliance runs take about a second without the model and a few seconds with it; the first call after an idle spell
  can take longer. The model has a 60 second limit and the result falls back to template wording (`source: "template"`). Show a spinner, not an error.
- **Nothing is saved from free text.** Intake proposals and document fields are suggestions until the user confirms them.
- **Money and dates.** Rupees as integers; dates as ISO strings. Tender `closing_date` has a time.

## 5. Try it in a browser console

```js
const base = "http://localhost:8000/api/v1";
const { business_id, access_token } = await (await fetch(`${base}/businesses`, {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "UI test" }) })).json();
const auth = { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" };
const q = await (await fetch(`${base}/intake/query`, { method: "POST", headers: auth,
  body: JSON.stringify({ text: "I want a loan of 50L for expanding my factory" }) })).json();
console.log(q.proposals, q.questions.map(x => x.prompt));
```
