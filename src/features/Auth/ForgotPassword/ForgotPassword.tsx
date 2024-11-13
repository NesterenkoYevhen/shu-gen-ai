import {
  FC, useId, useRef, useState, useTransition, useEffect,
} from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { Textfield } from '@/shared/ui-kit/Textfield';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { forgotPassword } from '@/shared/actions/user';
import { AuthView } from '../AuthView';

interface IForgotPassword {
  isOpen: boolean;
  onClose: () => void;
  onOpenPasswordReset: () => void;
  setEmail: (value: string) => void;
}

export const ForgotPassword: FC<IForgotPassword> = ({
  isOpen, onClose, onOpenPasswordReset, setEmail,
}) => {
  const t = useTranslations('auth.forgot-password');
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return t('email-required');
    if (!emailRegex.test(email)) return t('email-not-valid');
    return null;
  };

  useEffect(() => {
    if (!isOpen) {
      formRef.current?.reset();
      setEmailError(null);
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
            const email = formData.get('email') as string;

            const emailValidationError = validateEmail(email);
            setEmailError(emailValidationError);

            if (!emailValidationError) {
              try {
                await forgotPassword(email);
                setEmail(email);
                toast.success(t('success'));
                onClose();
                onOpenPasswordReset();
              } catch (error) {
                toast.error(t('request-failed'));
              }
            }
          });
        }}
      >
        <fieldset>
          <Textfield
            label={t('email-label')}
            isRequired
            placeholder={t('email-placeholder')}
            name="email"
            type="email"
            error={emailError}
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
