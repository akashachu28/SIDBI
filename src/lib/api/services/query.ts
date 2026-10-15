import { apiClient } from '../axios'
import type { ApiResponse } from '../types'

/**
 * Query API Service
 * Handles business query submissions
 */

export interface QueryRequest {
  query: string
}

export interface QueryResponse {
  // Add response fields based on your API response
  success: boolean
  message?: string
  data?: unknown
}

/**
 * Submit a business query
 */
export async function submitQuery(payload: QueryRequest): Promise<ApiResponse<QueryResponse>> {
  try {
    const response = await apiClient.post<ApiResponse<QueryResponse>>(
      '/api/v1/ui/query',
      payload
    )
    return response.data
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to submit query'
    throw new Error(errorMessage)
  }
}
