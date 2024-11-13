'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button, ButtonSize, ButtonVariants } from '@/shared/ui-kit/Button';
import toast from 'react-hot-toast';
import { deleteSubscription } from '@/shared/actions/subscriptions';

export const CancelMembership = () => {
  const t = useTranslations('profile.membership');
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelMembership = async () => {
    setIsLoading(true);
    try {
      await deleteSubscription(locale);
      toast.success(t('cancel-success'));
    } catch (error) {
      toast.error(t('cancel-failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={ButtonVariants.BORDER_GREY}
      size={ButtonSize.SMALL}
      width="195px"
      className="!w-full tablet:!w-[195px]"
      onClick={handleCancelMembership}
      disabled={isLoading}
    >
      {isLoading ? t('canceling') : t('cancel')}
    </Button>
  );
};
