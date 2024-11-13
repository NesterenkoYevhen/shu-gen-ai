'use client';

import { useRef, useState, useTransition } from 'react';
import InputMask from 'react-input-mask';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { ButtonSize } from '@/shared/ui-kit/Button/Button';
import { Textfield } from '@/shared/ui-kit/Textfield';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { useSession } from 'next-auth/react';
import { Loader } from '@/shared/ui-kit/Loader';
import { UserResponse } from '@/shared/types/common';
import { updateUser } from '@/shared/actions/user';

export const PersonalInfo = () => {
  const { data: session, status, update } = useSession();
  const userInfo = session?.user as UserResponse;
  const loading = status === 'loading';
  const t = useTranslations('profile.personal-info');
  const formRef = useRef<HTMLFormElement>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const validateUsername = (username: string) => (username && username.length > 20 ? t('username-error') : null);
  const validateName = (name: string) => (name && !/^[a-zA-Z]+$/.test(name) ? t('name-error') : null);
  const validatePhone = (phone: string) => (phone && !/^\(\d{3}\) \d{3} \d{4}$/.test(phone) ? t('phone-error') : null);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const username = formData.get('username') as string;
      const firstName = formData.get('first_name') as string;
      const lastName = formData.get('last_name') as string;
      const phone = formData.get('phone') as string;

      const usernameValidationError = validateUsername(username);
      const firstNameValidationError = validateName(firstName);
      const lastNameValidationError = validateName(lastName);
      const phoneValidationError = validatePhone(phone);

      setUsernameError(usernameValidationError);
      setFirstNameError(firstNameValidationError);
      setLastNameError(lastNameValidationError);
      setPhoneError(phoneValidationError);

      if (!usernameValidationError && !firstNameValidationError && !lastNameValidationError && !phoneValidationError) {
        try {
          const newUser = await updateUser(userInfo?.email, lastName, firstName, username, phone);
          const newSession = {
            ...session,
            user: newUser,
          };
          await update(newSession);
          toast.success(t('success'));
        } catch (error) {
          toast.error(t('update-failed'));
        }
      }
    });
  };

  const renderContent = () => {
    if (loading) return <Loader />;
    if (session?.user) {
      return (
        <form
          ref={formRef}
          className="flex flex-col gap-4 w-full"
          action={(formData) => handleSubmit(formData)}
        >
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-x-6 gap-y-2">
            <fieldset>
              <Textfield
                label={t('username-label')}
                placeholder={t('username-placeholder')}
                name="username"
                type="text"
                error={usernameError}
                onBlur={(e) => setUsernameError(validateUsername(e.target.value))}
                defaultValue={userInfo?.nickname}
              />
            </fieldset>
            <fieldset>
              <Textfield
                label={t('first-name-label')}
                placeholder={t('first-name-placeholder')}
                name="first_name"
                type="text"
                error={firstNameError}
                onBlur={(e) => setFirstNameError(validateName(e.target.value))}
                defaultValue={userInfo?.first_name}
              />
            </fieldset>
            <fieldset>
              <Textfield
                label={t('last-name-label')}
                placeholder={t('last-name-placeholder')}
                name="last_name"
                type="text"
                error={lastNameError}
                onBlur={(e) => setLastNameError(validateName(e.target.value))}
                defaultValue={userInfo?.last_name}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="phone">{t('phone-label')}</label>
              <InputMask mask="(999) 999 9999" defaultValue={userInfo?.phone_number}>
                {(inputProps) => (
                  <Textfield
                    {...inputProps}
                    placeholder={t('phone-placeholder')}
                    name="phone"
                    error={phoneError}
                  />
                )}
              </InputMask>
            </fieldset>
            <fieldset>
              <Textfield
                label={t('email-label')}
                placeholder={t('email-placeholder')}
                name="email"
                type="text"
                value={userInfo?.email}
                readOnly
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
      );
    }
    return null;
  };

  return (
    <section className="p-6 rounded-3xl flex flex-col gap-6 bg-additionalGrey100-light dark:bg-additionalGrey100-dark min-h-[200px]">
      <Typography variant={TypographyVariants.TITLE_3}>{t('title')}</Typography>
      <div className="flex justify-center mt-4 w-full">{renderContent()}</div>
    </section>
  );
};
