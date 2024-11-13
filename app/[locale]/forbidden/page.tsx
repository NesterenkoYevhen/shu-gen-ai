import { useTranslations } from 'next-intl';

import { Error } from '@/features/Error';

const Page = () => {
  const t = useTranslations('error.forbidden');
  return (
    <Error title={t('title')} message={t('description')} />
  );
};

export default Page;
