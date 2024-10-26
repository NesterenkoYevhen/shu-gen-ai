/* eslint-disable no-promise-executor-return */
import axios from 'axios';

interface LoginResponse {
  success: boolean;
  message?: string;
}

export async function simulateLoginRequest(email: FormDataEntryValue, password: FormDataEntryValue): Promise<LoginResponse> {
  await new Promise((res) => setTimeout(res, 5000));
  try {
    const response = await axios.post<LoginResponse>('/api/login', { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      return {
        success: false,
        message: error.message,
      };
    }
    console.error('Unexpected error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}
