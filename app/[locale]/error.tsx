'use client';

import { FC } from 'react';
import { useTranslations } from 'use-intl';

import { Error } from '@/features/Error';
import { Container } from '@/shared/ui-kit/Container';

interface ErrorProps {
  error: Error;
}

const ErrorComponent: FC<ErrorProps> = ({ error }) => {
  const t = useTranslations('error.error');
  return (
    <Container>
      <Error title={t('title')} message={error.message} />
    </Container>
  );
};

export default ErrorComponent;
