'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import axiosInstance from '../lib/axios-instance';
import { FeatureTextResponse } from '../types/common';

export const createCodeDocumentation = async (text: FormData, locale: string): Promise<FeatureTextResponse> => {
  try {
    const response = await axiosInstance.post<FeatureTextResponse>('/features/document_code/', text);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to create code documentation: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const createEssay = async (text: FormData, locale: string): Promise<FeatureTextResponse> => {
  try {
    const response = await axiosInstance.post<FeatureTextResponse>('/features/essay_writer/', text);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to create essay: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const makeGrammarCheck = async (text: FormData, locale: string): Promise<FeatureTextResponse> => {
  try {
    const response = await axiosInstance.post<FeatureTextResponse>('/features/grammar_checker/', text);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to make grammar check: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const createParagraph = async (text: FormData, locale: string): Promise<FeatureTextResponse> => {
  try {
    console.log(text);
    const response = await axiosInstance.post<FeatureTextResponse>('/features/paragraph_writer/', text);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to create paragraph: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const createPost = async (text: FormData, locale: string): Promise<FeatureTextResponse> => {
  try {
    const response = await axiosInstance.post<FeatureTextResponse>('/features/post_writer/', text);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const rewriteText = async (text: FormData, locale: string): Promise<FeatureTextResponse> => {
  try {
    const response = await axiosInstance.post<FeatureTextResponse>('/features/rewrite_text/', text);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to rewrite text: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const createSummary = async (text: FormData, locale: string): Promise<FeatureTextResponse> => {
  try {
    const response = await axiosInstance.post<FeatureTextResponse>('/features/generate_summary/', text);

    revalidatePath(`/${locale}/profile`);
    revalidatePath(`/${locale}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to create summary: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};
