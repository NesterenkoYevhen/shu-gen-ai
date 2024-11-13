'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';

import { UserResponse } from '@/shared/types/common';

import { ConfirmRegistration } from '@/features/Auth/ConfirmRegistration';
import { ForgotPassword } from '@/features/Auth/ForgotPassword';
import { Login } from '@/features/Auth/Login';
import { Registration } from '@/features/Auth/Registration';
import { ResetPassword } from '@/features/Auth/ResetPassword';
import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { LoggedInDropdown } from '@/features/LoggedInDropdown';

export const HeaderLogin = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [modal, setModal] = useState<string | null>(null);
  const [emailLogin, setEmailLogin] = useState('');
  const [emailRegistration, setEmailRegistration] = useState('');
  const t = useTranslations('header');

  const handleClose = () => setModal(null);

  const renderContent = () => {
    if (loading) return null;
    if (session?.user) return <LoggedInDropdown user={session.user as UserResponse} />;
    return (
      <Button
        variant={ButtonVariants.PRIMARY}
        width="153px"
        onClick={() => setModal('login')}
      >
        {t('sign-in')}
      </Button>
    );
  };

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
      <div>{renderContent()}</div>
    </div>
  );
};
