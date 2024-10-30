'use client';

import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { Button, ButtonSize, ButtonVariants } from '@/shared/ui-kit/Button';

export const CancelMembership = () => {
  const t = useTranslations('profile.membership');
  const handleCancelMembership = () => toast.success(t('cancel-success'));

  return (
    <Button variant={ButtonVariants.BORDER_GREY} size={ButtonSize.SMALL} width="195px" className="!w-full tablet:!w-[195px]" onClick={handleCancelMembership}>
      {t('cancel')}
    </Button>
  );
};
