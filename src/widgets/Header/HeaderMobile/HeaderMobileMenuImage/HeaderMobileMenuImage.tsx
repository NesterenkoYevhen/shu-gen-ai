/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FC } from 'react';
import cn from 'classnames';

import { useTranslations } from 'next-intl';
import { useAccordion } from '@/shared/hooks/useAccordion';

import { image } from '@/shared/constants/tools';

import ChevronLight from '@/assets/icons/chevron-black.svg';
import ChevronDark from '@/assets/icons/chevron-white.svg';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { LocaleLink } from '@/features/LocaleNavigation';
import { FeatureItem } from '../components/FeatureItem';
import { OtherItem } from '../components/OtherItem';

import { IMobileMenuConroller } from '../HeaderMobileMenu/HeaderMobileMenu';

export const HeaderMobileMenuImage:FC<IMobileMenuConroller> = ({ setActive }) => {
  const features = image.slice(0, 6);
  const others = image.slice(6);
  const t = useTranslations();
  const {
    toggle,
    ref,
    isVisible,
  } = useAccordion<HTMLDivElement>(false);
  return (
    <li>
      <div
        className={cn('flex py-3 px-4 rounded-2xl justify-between items-center transition-all duration-300', {
          'bg-secondaryPurple-light dark:text-neutralsGrey800-dark': isVisible,
        })}
        onClick={toggle}
      >
        <Typography
          variant={TypographyVariants.MAIN}
          className={cn({
            'text-text-light': isVisible,
          })}
        >
          {t('features.image.name')}

        </Typography>
        <ChevronDark className={cn('hidden dark:block transition-transform duration-300', {
          '!hidden': isVisible,
        })}
        />
        <ChevronLight className={cn('hidden transition-transform duration-300', {
          'dark:!block rotate-180': isVisible,
        })}
        />
        <ChevronLight className={cn('block dark:hidden transition-transform duration-300', {
          'rotate-180': isVisible,
          'rotate-0': !isVisible,
        })}
        />
      </div>
      <div ref={ref}>
        <div className="p-6 ">
          <Typography
            variant={TypographyVariants.SECONDARY}
            className="uppercase text-neutralsGrey500-light dark:text-neutralsGrey500-dark"
          >
            {t('header.features-tools')}
          </Typography>
          <ul className="flex flex-col gap-2 mt-4">
            {features.map(({
              id, label, route, Icon,
            }) => <FeatureItem key={id} name={t(`features.${label}.name`)} link={route} Icon={Icon} setActive={setActive} />)}
          </ul>
          <Typography
            variant={TypographyVariants.SECONDARY}
            className="uppercase mt-4 text-neutralsGrey500-light dark:text-neutralsGrey500-dark"
          >
            {t('header.other-image-tools')}
          </Typography>
          <ul className="flex flex-col gap-2 mt-4">
            {others.map(({ id, label, route }) => <OtherItem key={id} name={t(`features.${label}.name`)} link={route} setActive={setActive} />)}
            <li className="bg-transparent hover:bg-neutralsGrey300-light dark:hover:bg-grey1-dark rounded-xl">
              <LocaleLink href="/" onClick={() => setActive(false)}>
                <Typography variant={TypographyVariants.SECONDARY} fontWeight="bold" className="text-secondaryGreen-light">
                  {t('header.all-image-tools')}
                </Typography>
              </LocaleLink>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
};
