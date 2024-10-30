'use client';

import { useRef, useState, useTransition } from 'react';
import InputMask from 'react-input-mask';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { ButtonSize } from '@/shared/ui-kit/Button/Button';
import { Textfield } from '@/shared/ui-kit/Textfield';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

export const PersonalInfo = () => {
  const t = useTranslations('profile.personal-info');
  const formRef = useRef<HTMLFormElement>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const validateUsername = (username: string) => (username.length > 20 ? t('username-error') : null);

  const validateName = (name: string) => (/^[a-zA-Z]+$/.test(name) ? null : t('name-error'));

  const validatePhone = (phone: string) => (/^\(\d{3}\) \d{3} \d{4}$/.test(phone) ? null : t('phone-error'));

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
        toast.success(t('success'));
      }
    });
  };

  return (
    <section className="p-6 rounded-3xl flex flex-col gap-6 bg-additionalGrey100-light dark:bg-additionalGrey100-dark">
      <Typography variant={TypographyVariants.TITLE_3}>{t('title')}</Typography>
      <form
        ref={formRef}
        className="flex flex-col gap-4"
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
            />
          </fieldset>
          <fieldset>
            <label htmlFor="phone">{t('phone-label')}</label>
            <InputMask mask="(999) 999 9999">
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
              value="user@example.com"
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
    </section>
  );
};
