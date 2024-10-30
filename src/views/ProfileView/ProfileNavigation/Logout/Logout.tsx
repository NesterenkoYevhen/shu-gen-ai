'use client';

import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import LogoutLight from '@/assets/icons/profile/logout-light.svg';
import LogoutDark from '@/assets/icons/profile/logout-dark.svg';

export const Logout = () => {
  const t = useTranslations('profile.navigation');
  const router = useRouter();

  const handleLogout = () => {
    toast.success('Logout');
    router.push('/');
  };

  return (
    <button
      type="button"
      className="py-2.5 px-4 rounded-2xl bg-additionalGrey200-light dark:bg-additionalGrey200-dark flex items-center gap-3 w-full"
      onClick={handleLogout}
    >
      <LogoutLight className="block dark:hidden" />
      <LogoutDark className="hidden dark:block" />
      <Typography className={TypographyVariants.MAIN}>{t('logout')}</Typography>
    </button>
  );
};
