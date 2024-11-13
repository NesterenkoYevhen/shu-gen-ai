import {
  FC, useEffect, useId, useRef, useState, useTransition,
} from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { Textfield } from '@/shared/ui-kit/Textfield';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { Checkbox } from '@/shared/ui-kit/Checkbox';
import { register } from '@/shared/actions/user';
import { AuthView } from '../AuthView';

interface IRegistration {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
  onOpenRegistrationConfirmation: () => void;
  setEmail: (value: string) => void;
}

export const Registration: FC<IRegistration> = ({
  isOpen, onClose, onOpenLogin, setEmail, onOpenRegistrationConfirmation,
}) => {
  const t = useTranslations('auth.registration');
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return t('email-required');
    if (!emailRegex.test(email)) return t('email-not-valid');
    return null;
  };

  const validatePassword = (password: string) => {
    if (!password) return t('password-required');
    if (password.length < 8) return t('password-min-length');
    if (!/[A-Z]/.test(password)) return t('password-uppercase');
    if (!/[a-z]/.test(password)) return t('password-lowercase');
    if (!/\d/.test(password)) return t('password-number');
    return null;
  };

  useEffect(() => {
    if (!isOpen) {
      formRef.current?.reset();
      setEmailError(null);
      setPasswordError(null);
    }
  }, [isOpen]);

  return (
    <AuthView isOpen={isOpen} onClose={onClose} id={id}>
      <Typography variant={TypographyVariants.TITLE_3} className="text-center">{t('title')}</Typography>
      <form
        className="mt-8 w-[297px] sm:w-[357px] flex flex-col gap-4"
        ref={formRef}
        action={(formData) => {
          startTransition(async () => {
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;

            const emailValidationError = validateEmail(email);
            const passwordValidationError = validatePassword(password);

            setEmailError(emailValidationError);
            setPasswordError(passwordValidationError);

            if (!emailValidationError && !passwordValidationError) {
              try {
                await register(email, password);
                setEmail(email);
                toast.success(t('success'));
                onClose();
                onOpenRegistrationConfirmation();
              } catch (error) {
                toast.error(t('register-failed'));
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
          <Textfield
            label={t('password-label')}
            isRequired
            placeholder={t('password-placeholder')}
            name="password"
            type="password"
            error={passwordError}
          />
        </fieldset>
        <fieldset className="flex items-center justify-between">
          <Checkbox name="subscribe-news" label={t('subscribe-news')} labelStyle="text-neutralsGrey500-light dark:text-neutralsGrey500-dark" />
        </fieldset>
        <fieldset>
          <Button variant={ButtonVariants.PRIMARY} width="100%" type="submit" disabled={isPending}>
            {isPending ? t('submit-pending') : t('submit-label')}
          </Button>
        </fieldset>
        <div className="mt-4 flex justify-center items-center gap-2.5">
          <Typography variant={TypographyVariants.MAIN}>{t('already-have-account')}</Typography>
          <button type="button" onClick={() => { onClose(); onOpenLogin(); }}>
            <Typography variant={TypographyVariants.TITLE_5} className="text-secondaryGreen-light dark:text-secondaryGreen-dark">
              {t('sign-in')}
            </Typography>
          </button>
        </div>
      </form>
    </AuthView>
  );
};
