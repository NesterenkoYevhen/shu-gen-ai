'use client';

import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

import DeleteLight from '@/assets/icons/profile/delete-account-light.svg';
import DeleteDark from '@/assets/icons/profile/delete-account-dark.svg';
import { deleteCard } from '@/shared/actions/cards';
import { usePathname } from 'next/navigation';

interface ICardDelete {
  id: string;
}

export const CardDelete: FC<ICardDelete> = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const pathname = usePathname();
  const pathLocale = pathname.split('/')[1] || 'en';
  const t = useTranslations('profile.payment-details.card-delete');

  const handleDeleteCard = async () => {
    setIsDeleting(true);
    try {
      await deleteCard(id, pathLocale);
      toast.success(t('success'));
    } catch (error) {
      toast.error(t('error'));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDeleteCard}
      disabled={isDeleting}
      className={`flex items-center ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <DeleteLight className="block dark:hidden" />
      <DeleteDark className="hidden dark:block" />
    </button>
  );
};
