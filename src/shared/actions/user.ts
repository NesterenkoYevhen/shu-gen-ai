'use server';

import axios from 'axios';
import axiosInstance from '../lib/axios-instance';
import { FeatureFileResponse, RecentTool } from '../types/common';

export const logout = async () => {
  try {
    await axiosInstance.post('/auth/token/logout/');
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to logout: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const register = async (email: string, password: string) => {
  try {
    await axiosInstance.post('/users/register/', {
      email,
      password,
    });
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to register: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const verifyEmail = async (email: string, code: string) => {
  try {
    await axiosInstance.post('/users/verify-email/', {
      email,
      code,
    });
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to verify email: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await axiosInstance.post('/users/password-reset/', {
      email,
    });
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to request for reset password: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const forgotPasswordVerify = async (email: string, code: string, new_password: string) => {
  try {
    await axiosInstance.post('/users/password-reset-verification/', {
      email,
      code,
      new_password,
    });
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to change the password: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const updateUser = async (email: string, last_name: string, first_name: string, nickname: string, phone_number: string) => {
  try {
    const user = await axiosInstance.put('/auth/users/me/', {
      email,
      last_name,
      first_name,
      nickname,
      phone_number,
    });
    return user.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to change user data: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const updatePassword = async (old_password: string, new_password: string) => {
  try {
    await axiosInstance.post('/users/password-change/', {
      old_password,
      new_password,
    });
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to change password: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const deleteAccount = async () => {
  try {
    await axiosInstance.delete('/auth/users/me/');
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to delete account: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const getUserHistory = async () => {
  try {
    const response = await axiosInstance.get<FeatureFileResponse[]>('/features/user-history/');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to get user history: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const getUserRecentTools = async () => {
  try {
    const response = await axiosInstance.get<RecentTool[]>('/features/features/recent/');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to get user recent tools: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};
