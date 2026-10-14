/**
 * Environment Configuration
 * Centralized access to environment variables
 */

export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://106.51.226.42:4561',
};

// Validate required environment variables
if (!env.apiUrl) {
  throw new Error('Missing required environment variable: NEXT_PUBLIC_API_URL');
}
