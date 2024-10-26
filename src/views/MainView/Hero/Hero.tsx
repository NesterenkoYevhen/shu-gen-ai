import { useTranslations } from 'next-intl';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { AppImage } from '@/shared/ui-kit/AppImage';

import HeroArrowBig from '@/assets/icons/main-page/hero-arrow-big.svg';
import HeroArrowSmall from '@/assets/icons/main-page/hero-arrow-small.svg';
import HeroImage from '@/assets/images/main-page/hero-bg.png';

export const Hero = () => {
  const t = useTranslations('main-page');
  return (
    <>
      <div className="max-w-[942px]">
        <Typography variant={TypographyVariants.TITLE_1} className="!text-[32px] sm:!text-[56px]">
          {t('title')}
          <HeroArrowBig className="hidden sm:inline ml-4" />
          <HeroArrowSmall className="inline sm:hidden ml-2" />
        </Typography>
        <Typography
          variant={TypographyVariants.TITLE_2}
          className="mt-6 !text-base sm:!text-[22px] text-neutralsGrey700-light dark:text-neutralsGrey700-dark"
          fontWeight="regular"
        >
          {t('hero-description')}
        </Typography>
      </div>

      <div className="mt-16 w-full">
        <AppImage src={HeroImage} alt="hero image" />
      </div>
    </>
  );
};
