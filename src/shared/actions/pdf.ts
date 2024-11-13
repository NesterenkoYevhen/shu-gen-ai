'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import axiosInstance from '../lib/axios-instance';
import { FeatureFileResponse } from '../types/common';

export const compressPDF = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/compress_pdf/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to compress PDF: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformPDFtoDOCX = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/pdf_to_docx/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform PDF: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const transformDOCXtoPDF = async (file: FormData, locale: string): Promise<FeatureFileResponse> => {
  try {
    const response = await axiosInstance.post<FeatureFileResponse>('/features/docx_to_pdf/', file);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to transform DOCX: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};
