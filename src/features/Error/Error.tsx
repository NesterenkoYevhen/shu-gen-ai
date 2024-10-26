import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { LocaleLink } from '../LocaleNavigation';

interface IError {
  title: string;
  message: string;
}

export const Error:FC<IError> = ({ title, message }) => {
  const t = useTranslations('error');
  return (
    <div className="w-full px-6">
      <div className="w-fit p-10 rounded-3xl bg-neutralsGrey100-light dark:bg-neutralsGrey100-dark mx-auto mt-[11dvh]">
        <Typography variant={TypographyVariants.TITLE_1}>{title}</Typography>
        <Typography variant={TypographyVariants.MAIN} className="mt-4">{message}</Typography>
        <div className="flex gap-4 mt-6 flex-wrap sm:flex-nowrap">
          <LocaleLink href="/" className="w-full sm:w-[208px]"><Button variant={ButtonVariants.PRIMARY} width="100%" className="sm:!w-[208px] ">{t('go-main')}</Button></LocaleLink>
          <Button variant={ButtonVariants.SECONDARY} width="100%" className="sm:!w-[208px]">{t('support')}</Button>
        </div>
      </div>
    </div>
  );
};
