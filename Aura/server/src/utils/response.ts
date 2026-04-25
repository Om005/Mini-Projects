import { ApiResponse } from '../types/api';

function sendResponse({
  success,
  message,
  data,
  error,
}: {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}): ApiResponse {
  const response: ApiResponse = { success };
  if (message) response.message = message;
  if (data !== undefined) response.data = data;
  if (error) response.error = error;
  return response;
}


export { sendResponse };