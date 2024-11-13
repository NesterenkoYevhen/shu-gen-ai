'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { Button, ButtonSize, ButtonVariants } from '@/shared/ui-kit/Button';
import { Checkbox } from '@/shared/ui-kit/Checkbox';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { deleteAccount } from '@/shared/actions/user';
import { signOut } from 'next-auth/react';
import { useRouter } from '@/features/LocaleNavigation';

export const DeleteAccount = () => {
  const router = useRouter();
  const t = useTranslations('profile.delete-account');
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  const handleDeleteAccount = async () => {
    if (!isConfirmDelete) return;

    try {
      await deleteAccount();
      toast.success(t('delete-success'));
      await signOut();
      router.push('/');
    } catch (error) {
      toast.error(t('delete-failed'));
    }
  };

  return (
    <section className="p-6 rounded-3xl bg-additionalGrey100-light dark:bg-additionalGrey100-dark scroll-mt-32" id="delete-account">
      <Typography variant={TypographyVariants.TITLE_3}>{t('title')}</Typography>
      <Typography className="mt-8" variant={TypographyVariants.MAIN}>{t('description')}</Typography>
      <form className="mt-6" onSubmit={(e) => { e.preventDefault(); handleDeleteAccount(); }}>
        <Checkbox name="confirm" label={t('confirm-msg')} onChangeParent={setIsConfirmDelete} />
        <Button variant={ButtonVariants.DANGER} width="225px" size={ButtonSize.SMALL} disabled={!isConfirmDelete} className="mt-8" type="submit">
          {t('delete')}
        </Button>
      </form>
    </section>
  );
};
