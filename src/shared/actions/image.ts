'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import axiosInstance from '../lib/axios-instance';
import { FeatureFileResponse, FeatureImageRecognitionResponse } from '../types/common';

export const createBlackAndWhiteImage = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/black_and_white/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to make black and white image: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const createBlurImage = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/blur_image/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to make blured image: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const createRoundImage = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/round_image/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to make rounded image: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const createPixelatedImage = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/pixelate_image/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to make pixelated image: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const compressImage = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/compress_image/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to compress image: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformHEICtoJPG = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/heif_to_jpg/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform image: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformPNGtoJPG = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/png_to_jpg/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform image: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformRAWtoJPG = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/raw_to_jpg/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform image: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformTIFFtoJPG = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/tiff_to_jpg/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform image: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const removeBackgroundImage = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/remove_background/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to make blured image: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const editBackgroundImage = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/edit_background/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to make blured image: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const pickUpObjectImage = async (fileWithObjects: FormData, locale: string, requestType: 'recognition' | 'processing'): Promise<FeatureImageRecognitionResponse | FeatureFileResponse> => {
  try {
    let response;
    if (requestType === 'recognition') {
      fileWithObjects.append('language', locale);
      response = await axiosInstance.post('/features/pick_up_object/', fileWithObjects);
      const sessionId = response.headers['set-cookie']?.find((cookie) => cookie.includes('sessionid'))?.split('; ')[0];
      if (sessionId) {
        cookies().set('sessionId', sessionId);
      }
    } else {
      const sessionId = cookies().get('sessionId')?.value;
      response = await axiosInstance.post('/features/pick_up_object/', fileWithObjects, {
        headers: {
          Cookie: sessionId,
        },
      });
    }
    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to pick up object from image: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const cutOutObjectImage = async (fileWithObjects: FormData, locale: string, requestType: 'recognition' | 'processing'): Promise<FeatureImageRecognitionResponse | FeatureFileResponse> => {
  try {
    let response;
    if (requestType === 'recognition') {
      fileWithObjects.append('language', locale);
      response = await axiosInstance.post('/features/cut_out_object/', fileWithObjects);
      const sessionId = response.headers['set-cookie']?.find((cookie) => cookie.includes('sessionid'))?.split('; ')[0];
      if (sessionId) {
        cookies().set('sessionId', sessionId);
      }
    } else {
      const sessionId = cookies().get('sessionId')?.value;
      response = await axiosInstance.post('/features/cut_out_object/', fileWithObjects, {
        headers: {
          Cookie: sessionId,
        },
      });
    }
    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to cut out object from image: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};
