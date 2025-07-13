const isDevelopment = process.env.NODE_ENV === 'development';
const API_BASE_URL = isDevelopment ? 'http://localhost:3002/api' : '/api';

const getHeaders = async (): Promise<HeadersInit> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  return headers;
};

// Helper function for making authenticated API calls
const apiCall = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const method = options.method?.toUpperCase() || 'GET';

  const authHeaders = await getHeaders();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...authHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorMessage = `API call failed: ${method} ${endpoint}`;

    try {
      const errorText = await response.text();
      errorMessage += ` - Status: ${response.status} ${response.statusText}`;
      if (errorText) {
        errorMessage += ` - Response: ${errorText}`;
      }
    } catch (textError) {
      errorMessage += ` - Status: ${response.status} ${response.statusText}`;
    }

    throw new Error(errorMessage);
  }

  const parseJson = method !== 'DELETE';
  return parseJson ? response.json() : undefined;
};
