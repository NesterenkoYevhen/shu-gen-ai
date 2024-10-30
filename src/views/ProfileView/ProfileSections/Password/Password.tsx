'use client';

import { useRef, useState, useTransition } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { Button, ButtonVariants, ButtonSize } from '@/shared/ui-kit/Button';
import { Textfield } from '@/shared/ui-kit/Textfield';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

export const Password = () => {
  const t = useTranslations('profile.password');
  const formRef = useRef<HTMLFormElement>(null);
  const [oldPasswordError, setOldPasswordError] = useState<string | null>(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const validateOldPassword = (password: string) => (!password ? t('old-password-required') : null);

  const validatePassword = (password: string) => {
    if (!password) return t('new-password-required');
    if (password.length < 8) return t('password-min-length');
    if (!/[A-Z]/.test(password)) return t('password-uppercase');
    if (!/[a-z]/.test(password)) return t('password-lowercase');
    if (!/\d/.test(password)) return t('password-number');
    return null;
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => (password === confirmPassword ? null : t('confirm-password-mismatch'));

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const oldPassword = formData.get('old_password') as string;
      const newPassword = formData.get('new_password') as string;
      const confirmNewPassword = formData.get('confirm_new_password') as string;

      const oldPasswordValidationError = validateOldPassword(oldPassword);
      const newPasswordValidationError = validatePassword(newPassword);
      const confirmNewPasswordValidationError = validateConfirmPassword(newPassword, confirmNewPassword);

      setOldPasswordError(oldPasswordValidationError);
      setNewPasswordError(newPasswordValidationError);
      setConfirmNewPasswordError(confirmNewPasswordValidationError);

      if (!oldPasswordError && !newPasswordError && !confirmNewPasswordError) {
        toast.success(t('success'));
      }
    });
  };

  return (
    <section className="p-6 rounded-3xl flex flex-col gap-6 bg-additionalGrey100-light dark:bg-additionalGrey100-dark scroll-mt-32" id="password">
      <Typography variant={TypographyVariants.TITLE_3}>{t('title')}</Typography>
      <form
        ref={formRef}
        className="flex flex-col gap-4"
        action={(formData) => handleSubmit(formData)}
      >
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-x-6 gap-y-2">
          <fieldset>
            <Textfield
              label={t('current-password-label')}
              placeholder={t('current-password-placeholder')}
              name="old_password"
              type="password"
              error={oldPasswordError}
              onBlur={(e) => setOldPasswordError(validateOldPassword(e.target.value))}
            />
          </fieldset>
          <fieldset>
            <Textfield
              label={t('new-password-label')}
              placeholder={t('new-password-placeholder')}
              name="new_password"
              type="password"
              error={newPasswordError}
              onBlur={(e) => setNewPasswordError(validatePassword(e.target.value))}
            />
          </fieldset>
          <fieldset>
            <Textfield
              label={t('confirm-new-password-label')}
              placeholder={t('confirm-new-password-placeholder')}
              name="confirm_new_password"
              type="password"
              error={confirmNewPasswordError}
            />
          </fieldset>
        </div>
        <Button
          className="mt-2"
          variant={ButtonVariants.PRIMARY}
          size={ButtonSize.SMALL}
          width="225px"
          type="submit"
          disabled={isPending}
        >
          {isPending ? t('submit-pending') : t('submit')}
        </Button>
      </form>
    </section>
  );
};
