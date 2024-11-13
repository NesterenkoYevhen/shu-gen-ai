'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import axiosInstance from '../lib/axios-instance';
import { PlanAPIType } from '../types/common';
import { authOptions } from '../lib/auth';

const revalidateSession = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    // Use absolute URL for session revalidation
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'; // Replace with your actual base URL
    await fetch(`${baseUrl}/api/auth/session?update`, { method: 'GET' });
  }
};

export const createSubscriptions = async (plan_key: PlanAPIType, duration: string, locale: string) => {
  try {
    await axiosInstance.post('/features/subscriptions/', {
      plan_key,
      duration,
    });
    await revalidateSession();

    revalidatePath(`/${locale}/profile`);

    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to create subscription: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const deleteSubscription = async (locale: string) => {
  try {
    await axiosInstance.delete('/features/subscriptions/user/');
    await revalidateSession();
    revalidatePath(`/${locale}/profile`);

    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to delete subscription: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};
