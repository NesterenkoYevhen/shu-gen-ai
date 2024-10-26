import {
  FC, useEffect, useId, useRef, useState, useTransition,
} from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { TextfieldModal } from '@/shared/ui-kit/TextfieldModal';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { AuthView } from '../AuthView';

interface IResetPassword {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export const ResetPassword: FC<IResetPassword> = ({ isOpen, onClose, email }) => {
  const t = useTranslations('auth.reset-password');
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const validateCode = (code: string) => (code.length === 6 && /^\d+$/.test(code) ? null : t('code-invalid'));

  const validatePassword = (password: string) => {
    if (!password) return t('password-required');
    if (password.length < 8) return t('password-min-length');
    if (!/[A-Z]/.test(password)) return t('password-uppercase');
    if (!/[a-z]/.test(password)) return t('password-lowercase');
    if (!/\d/.test(password)) return t('password-number');
    return null;
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => (password === confirmPassword ? null : t('confirm-password-mismatch'));

  useEffect(() => {
    if (!isOpen) {
      formRef.current?.reset();
      setPasswordError(null);
      setCodeError(null);
      setConfirmPasswordError(null);
    }
  }, [isOpen]);

  return (
    <AuthView isOpen={isOpen} onClose={onClose} id={id}>
      <Typography variant={TypographyVariants.TITLE_3} className="text-center">{t('title')}</Typography>
      <form
        ref={formRef}
        className="mt-8 w-[297px] sm:w-[357px] flex flex-col gap-4"
        action={(formData) => {
          startTransition(async () => {
            const code = formData.get('code') as string;
            const password = formData.get('password') as string;
            const confirmPassword = formData.get('confirmPassword') as string;

            const codeErrorTemp = validateCode(code);
            const passwordErrorTemp = validatePassword(password);
            const confirmPasswordErrorTemp = validateConfirmPassword(password, confirmPassword);

            setCodeError(codeErrorTemp);
            setPasswordError(passwordErrorTemp);
            setConfirmPasswordError(confirmPasswordErrorTemp);

            if (!codeErrorTemp && !passwordErrorTemp && !confirmPasswordErrorTemp) {
              console.log(email, formData);
              toast.success(t('success'));
              onClose();
            }
          });
        }}
      >
        <fieldset>
          <TextfieldModal
            label={t('code-label')}
            isRequired
            placeholder={t('code-placeholder')}
            name="code"
            type="text"
            maxLength={6}
            error={codeError}
          />
        </fieldset>
        <fieldset>
          <TextfieldModal
            label={t('new-password-label')}
            isRequired
            placeholder={t('new-password-placeholder')}
            name="password"
            type="password"
            error={passwordError}
          />
        </fieldset>
        <fieldset>
          <TextfieldModal
            label={t('confirm-password-label')}
            isRequired
            placeholder={t('confirm-password-placeholder')}
            name="confirmPassword"
            type="password"
            error={confirmPasswordError}
          />
        </fieldset>
        <fieldset>
          <Button variant={ButtonVariants.PRIMARY} width="100%" type="submit" disabled={isPending}>
            {isPending ? t('submit-pending') : t('submit-label')}
          </Button>
        </fieldset>
      </form>
    </AuthView>
  );
};
