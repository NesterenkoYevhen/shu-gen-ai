'use client';

import { FC } from 'react';
import { useTranslations } from 'use-intl';

import { Error } from '@/features/Error';

interface ErrorProps {
  error: Error;
}

const ErrorComponent: FC<ErrorProps> = ({ error }) => {
  const t = useTranslations('error.error');
  return (
    <Error title={t('title')} message={error.message} />
  );
};

export default ErrorComponent;
