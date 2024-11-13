'use server';

import axios from 'axios';
import axiosInstance from '../lib/axios-instance';
import { StatisticsResponse } from '../types/common';

export const getStatistics = async (): Promise<StatisticsResponse> => {
  try {
    const response = await axiosInstance.get<StatisticsResponse>('/utils/stats/');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch statistics: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};
