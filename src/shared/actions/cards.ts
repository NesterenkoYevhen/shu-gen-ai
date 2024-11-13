'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import axiosInstance from '../lib/axios-instance';
import { CreditCard } from '../types/common';

export const getCards = async () => {
  try {
    const cards = await axiosInstance.get<CreditCard[]>('/users/cards/');
    return cards.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch cards: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const deleteCard = async (id: string, locale: string) => {
  try {
    await axiosInstance.delete(`/users/cards/${id}/`);

    revalidatePath(`/${locale}/profile`);

    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to delete card: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const createCard = async (card_number: string, locale: string) => {
  try {
    await axiosInstance.post('/users/cards/', {
      card_number,
    });

    revalidatePath(`/${locale}/profile`);

    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to create card: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
};
