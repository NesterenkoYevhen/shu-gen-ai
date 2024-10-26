import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { ConfirmRegistration } from '@/features/Auth/ConfirmRegistration';
import { ForgotPassword } from '@/features/Auth/ForgotPassword';
import { Login } from '@/features/Auth/Login';
import { Registration } from '@/features/Auth/Registration';
import { ResetPassword } from '@/features/Auth/ResetPassword';
import { Button, ButtonVariants } from '@/shared/ui-kit/Button';

export const HeaderLogin = () => {
  const [modal, setModal] = useState<string | null>(null);
  const [emailLogin, setEmailLogin] = useState('');
  const [emailRegistration, setEmailRegistration] = useState('');
  const t = useTranslations('header');

  const handleClose = () => setModal(null);

  return (
    <div>
      <Login
        isOpen={modal === 'login'}
        onClose={handleClose}
        onOpenRegistration={() => setModal('registration')}
        onOpenForgotPassword={() => setModal('forgotPassword')}
      />
      <Registration
        isOpen={modal === 'registration'}
        onClose={handleClose}
        onOpenLogin={() => setModal('login')}
        onOpenRegistrationConfirmation={() => setModal('confirmRegistration')}
        setEmail={setEmailRegistration}
      />
      <ForgotPassword
        isOpen={modal === 'forgotPassword'}
        onClose={handleClose}
        onOpenPasswordReset={() => setModal('resetPassword')}
        setEmail={setEmailLogin}
      />
      <ResetPassword
        isOpen={modal === 'resetPassword'}
        onClose={handleClose}
        email={emailLogin}
      />
      <ConfirmRegistration
        isOpen={modal === 'confirmRegistration'}
        onClose={handleClose}
        email={emailRegistration}
      />
      <Button
        variant={ButtonVariants.PRIMARY}
        width="153px"
        onClick={() => setModal('login')}
      >
        {t('sign-in')}
      </Button>
      {/* <LoggedInDropdown /> */}
    </div>
  );
};
