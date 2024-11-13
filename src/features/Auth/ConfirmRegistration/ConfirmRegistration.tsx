import {
  FC, useEffect, useId, useRef, useState, useTransition,
} from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { Textfield } from '@/shared/ui-kit/Textfield';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { verifyEmail } from '@/shared/actions/user';
import { AuthView } from '../AuthView';

interface IConfirmRegistration {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export const ConfirmRegistration: FC<IConfirmRegistration> = ({ isOpen, onClose, email }) => {
  const t = useTranslations('auth.confirm-registration');
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const validateCode = (code: string) => (code.length === 6 && /^\d+$/.test(code) ? null : t('code-invalid'));

  useEffect(() => {
    if (!isOpen) {
      formRef.current?.reset();
      setCodeError(null);
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

            const codeErrorTemp = validateCode(code);
            setCodeError(codeErrorTemp);

            if (!codeErrorTemp) {
              try {
                await verifyEmail(email, code);
                toast.success(t('success'));
                onClose();
              } catch (error) {
                toast.error(t('verification-failed'));
              }
            }
          });
        }}
      >
        <fieldset>
          <Textfield
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
          <Button variant={ButtonVariants.PRIMARY} width="100%" type="submit" disabled={isPending}>
            {isPending ? t('submit-pending') : t('submit-label')}
          </Button>
        </fieldset>
      </form>
    </AuthView>
  );
};
