'use client';

import { FC } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import DeleteLight from '@/assets/icons/profile/delete-account-light.svg';
import DeleteDark from '@/assets/icons/profile/delete-account-dark.svg';

interface ICardDelete {
  id: number;
}

export const CardDelete:FC<ICardDelete> = ({ id }) => {
  const t = useTranslations('profile.payment-details.card-delete');
  const handleDeleteCard = () => {
    toast.success(t('success') + id);
  };
  return (
    <button type="button" onClick={handleDeleteCard}>
      <DeleteLight className="block dark:hidden" />
      <DeleteDark className="hidden dark:block" />
    </button>
  );
};
