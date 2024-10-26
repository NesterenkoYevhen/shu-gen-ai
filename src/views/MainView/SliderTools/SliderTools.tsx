/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import { useTranslations } from 'next-intl';

import { all } from '@/shared/constants/tools';

import ArrowPurple from '@/assets/icons/main-page/slider-arrow-purple.svg';
import ArrowPink from '@/assets/icons/main-page/slider-arrow-pink.svg';
import ArrowGreen from '@/assets/icons/main-page/slider-arrow-green.svg';
import ArrowBlack from '@/assets/icons/main-page/slider-arrow-black.svg';
import ArrowWhite from '@/assets/icons/main-page/slider-arrow-white.svg';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { AppImage } from '@/shared/ui-kit/AppImage';
import { LocaleLink } from '@/features/LocaleNavigation';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './SliderTools.module.scss';

export const SliderTools = () => {
  const swiperRef = useRef<any>(null);
  const t = useTranslations();
  const allWithImage = all.filter((el) => el.Image);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <Typography variant={TypographyVariants.TITLE_1} className="!text-[24px] sm:!text-[40px] w-[233px] sm:w-[604px]">
          {t('main-page.slider-tools.title')}
          {' '}
          <span className="text-purple dark:text-secondaryPurple-light !text-[18px] sm:!text-2xl !font-normal py-[2px] sm:py-[5px] px-4 border border-solid border-purple dark:border-secondaryPurple-light rounded-3xl">
            {t('main-page.slider-tools.recent')}
            {' '}
            <ArrowPurple className="inline dark:hidden ml-[3px] mb-0.5" />
            <ArrowPink className="hidden dark:inline ml-[3px] mb-0.5" />
          </span>
        </Typography>
        <div className="flex gap-[16px]">
          <button
            onClick={handlePrev}
            className="w-[40px] h-[40px] sm:w-[56px] sm:h-[56px] bg-additionalGrey200-light dark:bg-additionalGrey200-dark flex items-center justify-center rounded-full"
            type="button"
          >
            <ArrowBlack className="rotate-180 block dark:hidden" />
            <ArrowWhite className="hidden dark:block" />
          </button>
          <button
            onClick={handleNext}
            className="w-[40px] h-[40px] sm:w-[56px] sm:h-[56px] bg-primaryGreen-light flex items-center justify-center rounded-full"
            type="button"
          >
            <ArrowBlack />
          </button>
        </div>
      </div>
      <Swiper
        slidesPerView={1.5}
        spaceBetween={24}
        className="mt-12"
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
        ref={swiperRef}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 3.5,
          },
        }}
      >
        {
          allWithImage.map((feature) => (
            <SwiperSlide key={feature.id} className={styles.slide} style={{ width: 'auto' }}>
              <div>
                <div className="h-[242px]">
                  <AppImage className="rounded-2xl" src={feature.Image} alt="slider-item" />
                </div>
                <Typography className="mt-4 !text-[20px] sm:!text-[24px]" variant={TypographyVariants.TITLE_3}>{t(`features.${feature.label}.name`)}</Typography>
                <Typography className="mt-1 text-neutralsGrey600-light dark:text-neutralsGrey600-dark" variant={TypographyVariants.MAIN}>{t(`features.${feature.label}.description`)}</Typography>

                <LocaleLink href={feature.route} className="flex items-center gap-3.5 mt-4">
                  <Typography className="text-secondaryGreen-light" variant={TypographyVariants.TITLE_4}>{t('main-page.slider-tools.learn-more')}</Typography>
                  <ArrowGreen />
                </LocaleLink>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
};
