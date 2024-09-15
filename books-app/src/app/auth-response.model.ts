// auth-response.model.ts
export interface AuthResponse {
    access: string;   // The token used for authenticating API requests
    refresh: string;  // The token used for refreshing the access token
  }