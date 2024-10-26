import { useTranslations } from 'next-intl';

import { Error } from '@/features/Error';

const NotFound = () => {
  const t = useTranslations('error.not-found');
  return (
    <Error title={t('title')} message={t('description')} />
  );
};

export default NotFound;
