import {
  FC, useId, useRef, useState, useTransition, useEffect,
} from 'react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { Textfield } from '@/shared/ui-kit/Textfield';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { Checkbox } from '@/shared/ui-kit/Checkbox';
import { signIn } from 'next-auth/react';
import { AuthView } from '../AuthView';

interface ILogin {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegistration: () => void;
  onOpenForgotPassword: () => void;
}

export const Login: FC<ILogin> = ({
  isOpen, onClose, onOpenRegistration, onOpenForgotPassword,
}) => {
  const t = useTranslations('auth.login');
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
        ref={formRef}
        className="mt-8 w-[297px] sm:w-[357px] flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault(); // Зупинити стандартну поведінку
          startTransition(async () => {
            const email = formRef.current?.email.value as string;
            const password = formRef.current?.password.value as string;

            const emailValidationError = validateEmail(email);
            const passwordValidationError = validatePassword(password);

            setEmailError(emailValidationError);
            setPasswordError(passwordValidationError);

            if (!emailValidationError && !passwordValidationError) {
              const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
              });

              if (result?.error) {
                toast.error(t('login-failed'));
              } else {
                toast.success(t('success'));
                onClose();
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
          <Checkbox name="remember" label={t('remember-me')} labelStyle="text-neutralsGrey500-light dark:text-neutralsGrey500-dark" />
          <button type="button" onClick={() => { onClose(); onOpenForgotPassword(); }}>
            <Typography variant={TypographyVariants.SECONDARY} className="text-secondaryGreen-light dark:text-secondaryGreen-dark">{t('forget-password')}</Typography>
          </button>
        </fieldset>
        <fieldset>
          <Button variant={ButtonVariants.PRIMARY} width="100%" type="submit" disabled={isPending}>
            {isPending ? t('submit-pending') : t('submit-label')}
          </Button>
        </fieldset>
        <div className="mt-4 flex justify-center items-center gap-2.5">
          <Typography variant={TypographyVariants.MAIN}>{t('no-account')}</Typography>
          <button type="button" onClick={() => { onClose(); onOpenRegistration(); }}>
            <Typography variant={TypographyVariants.TITLE_5} className="text-secondaryGreen-light dark:text-secondaryGreen-dark">
              {t('sign-up')}
            </Typography>
          </button>
        </div>
      </form>
    </AuthView>
  );
};
