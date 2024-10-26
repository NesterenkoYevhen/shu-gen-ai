/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FC } from 'react';
import cn from 'classnames';

import { useTranslations } from 'next-intl';
import { useAccordion } from '@/shared/hooks/useAccordion';

import { pdf } from '@/shared/constants/tools';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import ChevronLight from '@/assets/icons/chevron-black.svg';
import ChevronDark from '@/assets/icons/chevron-white.svg';

import { ToolItem } from '../components/ToolItem';

import { IMobileMenuConroller } from '../HeaderMobileMenu/HeaderMobileMenu';

export const HeaderMobileMenuPDF:FC<IMobileMenuConroller> = ({ setActive }) => {
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
          {t('features.pdf.name')}

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
        <div className="p-6 text-neutralsGrey500-light dark:text-neutralsGrey500-dark">
          <Typography
            variant={TypographyVariants.SECONDARY}
            className="uppercase text-neutralsGrey500-light dark:text-neutralsGrey500-dark"
          >
            {t('features.pdf.category')}
          </Typography>
          <ul className="flex flex-col gap-4 mt-4">
            {pdf.map((el) => (
              <ToolItem name={t(`features.${el.label}.name`)} description={t(`features.${el.label}.description`)} link={el.route} Icon={el.Icon} key={el.id} setActive={setActive} />
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};
