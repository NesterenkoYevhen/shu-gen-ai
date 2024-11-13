'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import axiosInstance from '../lib/axios-instance';
import { FeatureFileResponse } from '../types/common';

export const compressVideo = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/compress_mp4/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to compress video: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformMKVtoMP4 = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/mkv_to_mp4/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform MKV: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformMP4toMP3 = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/mp4_to_mp3/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform MP4: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformMP4toGIF = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/mp4_to_gif/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform MP4: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};
