import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';

import { ConfirmRegistration } from '@/features/Auth/ConfirmRegistration';
import { ForgotPassword } from '@/features/Auth/ForgotPassword';
import { Login } from '@/features/Auth/Login';
import { Registration } from '@/features/Auth/Registration';
import { ResetPassword } from '@/features/Auth/ResetPassword';
import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { useSession } from 'next-auth/react';
import { LoggedInDropdown } from '@/features/LoggedInDropdown';
import { UserResponse } from '@/shared/types/common';

interface IHeaderMobileLogin {
  setActive: (value: boolean) => void;
}

export const HeaderMobileLogin: FC<IHeaderMobileLogin> = ({ setActive }) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const t = useTranslations();
  const [modal, setModal] = useState<string | null>(null);
  const [emailLogin, setEmailLogin] = useState('');
  const [emailRegistration, setEmailRegistration] = useState('');

  const renderContent = () => {
    if (loading) return null;
    if (session?.user) {
      return (
        <div className="flex justify-center mt-4">
          <LoggedInDropdown user={session.user as UserResponse} />
        </div>
      );
    }
    return (
      <Button
        variant={ButtonVariants.PRIMARY}
        width="100%"
        className="mt-4"
        onClick={() => {
          setActive(false);
          setModal('login');
        }}
      >
        {t('header.sign-in')}

      </Button>
    );
  };

  const handleClose = () => setModal(null);
  return (
    <>
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
      {renderContent()}
    </>
  );
};
