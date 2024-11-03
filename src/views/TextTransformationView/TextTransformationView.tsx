import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Container } from '@/shared/ui-kit/Container';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { MainController } from './MainController';

interface ITextTransformationView {
  featureType: string;
}

export const TextTransformationView: FC<ITextTransformationView> = ({ featureType }) => {
  const t = useTranslations();

  return (
    <Container className="mt-10">
      <Typography variant={TypographyVariants.TITLE_1}>
        {t(`features.write.${featureType}.name`)}
      </Typography>
      <Typography variant={TypographyVariants.MAIN} className="mt-2 text-neutralsGrey600-light dark:text-neutralsGrey600-dark">
        {t('features-pages.easily')}
        {' '}
        {t(`features.write.${featureType}.description`).toLowerCase()}
      </Typography>
      <MainController featureType={featureType} />
    </Container>
  );
};
