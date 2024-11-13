/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';

import { Subscription, SubscriptionResponse } from '../types/common';
import { tarrifs } from '../constants/tarrifs';

export const getSubscription = async (accessToken: string): Promise<Subscription | null> => {
  try {
    const response = await axios.get<SubscriptionResponse>(`${process.env.API_URL}/features/subscriptions/user/`, {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    });
    const API_ID = response.data?.plan;
    const subInfo = tarrifs.find((el) => el.api_id === API_ID);
    if (API_ID && subInfo) {
      const { start_date, end_date } = response.data;
      const {
        id, label, price, duration, api_label,
      } = subInfo;
      return {
        id, label, price, duration, api_label, start_date, end_date,
      };
    }

    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404 && error.response?.data?.error === 'No active subscription found.') {
        return null;
      }
      throw new Error(`Failed to fetch subscription: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};
