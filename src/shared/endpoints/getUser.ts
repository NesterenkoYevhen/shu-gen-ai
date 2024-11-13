import axios from 'axios';

import { UserResponse } from '../types/common';

export const getUser = async (accessToken: string): Promise<UserResponse> => {
  try {
    const response = await axios.get<UserResponse>(`${process.env.API_URL}/auth/users/me`, {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};
