import { FC, useRef } from 'react';

import cn from 'classnames';

import { useTranslations } from 'next-intl';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

import { image } from '@/shared/constants/tools';

import FallbackImage from '@/assets/images/fallback.png';

import { Container } from '@/shared/ui-kit/Container';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { LocaleLink } from '@/features/LocaleNavigation';
import { ToolItem } from '../components/ToolItem';
import { TextItem } from '../components/TextItem';
import { ImageItem } from '../components/ImageItem';

import styles from './MenuImage.module.scss';

interface MenuImageProps {
  isActive: boolean;
  setActiveItem: (value: null) => void
  className?: string;
}

export const MenuImage:FC<MenuImageProps> = ({ isActive, setActiveItem, className }) => {
  const t = useTranslations();
  const features = image.slice(0, 3);
  const ai = image.slice(3, 9);
  const other = image.slice(9);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, setActiveItem, null);

  return (
    <nav
      className={cn(
        styles.root,
        { [styles.active]: isActive },
        className,
        'bg-background-light dark:bg-background-dark shadow-menuLight dark:shadow-menuDark',
      )}
      onMouseLeave={() => setActiveItem(null)}
      ref={menuRef}
    >
      <Container className="flex gap-6">
        <div className="p-6 rounded-3xl bg-additionalGrey100-light dark:bg-additionalGrey100-dark w-[285px]">
          <Typography
            variant={TypographyVariants.SECONDARY}
            className="text-neutralsGrey500-light dark:text-grey2-dark uppercase"
          >
            {t('header.ai-tools')}
          </Typography>
          <ul className="flex flex-col gap-4 mt-6">
            {ai.map((el) => (
              <ToolItem name={t(`features.${el.label}.name`)} description={t(`features.${el.label}.description`)} link={el.route} Icon={el.Icon} key={el.id} />
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-6 flex-grow">
          <div className="p-6 rounded-3xl bg-additionalGrey100-light dark:bg-additionalGrey100-dark w-full">
            <Typography
              variant={TypographyVariants.SECONDARY}
              className="text-neutralsGrey500-light uppercase dark:text-grey2-dark"
            >
              {t('header.features-tools')}
            </Typography>
            <ul className="flex mt-4 justify-between">
              {features.map(({
                id, label, route, Image,
              }) => <ImageItem key={id} name={t(`features.${label}.name`)} description={t(`features.${label}.description`)} link={route} image={Image || FallbackImage} />)}
            </ul>
          </div>
          <div className="p-6 rounded-3xl bg-additionalGrey100-light dark:bg-additionalGrey100-dark w-full">
            <Typography
              variant={TypographyVariants.SECONDARY}
              className="text-neutralsGrey500-light uppercase dark:text-grey2-dark"
            >
              {t('header.other-image-tools')}
            </Typography>
            <ul className="mt-4 grid grid-cols-3 gap-x-4 gap-y-1">
              {other.map(({ id, label, route }) => <TextItem key={id} name={t(`features.${label}.name`)} link={route} />)}
              <li className="bg-transparent p-2 hover:bg-neutralsGrey300-light dark:hover:bg-grey1-dark rounded-xl">
                <LocaleLink href="/">
                  <Typography variant={TypographyVariants.SECONDARY} fontWeight="bold" className="text-secondaryGreen-light">
                    {t('header.all-image-tools')}
                  </Typography>
                </LocaleLink>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
};
