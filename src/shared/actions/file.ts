'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import axiosInstance from '../lib/axios-instance';
import { FeatureFileResponse } from '../types/common';

export const transformJSONtoCSV = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/json_to_csv/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform JSON: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformJSONtoXML = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/json_to_xml/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform JSON: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformXLStoCSV = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/xls_to_csv/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform XLS: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformXLStoJSON = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/xls_to_json/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform XLS: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformXLStoXML = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/xls_to_xml/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform XLS: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformXMLtoCSV = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/xml_to_csv/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform XML: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformXMLtoJSON = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/xml_to_json/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform XML: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};
