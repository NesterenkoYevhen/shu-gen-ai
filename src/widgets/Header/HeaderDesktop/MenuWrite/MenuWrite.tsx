import { FC } from 'react';

import cn from 'classnames';

import { useTranslations } from 'next-intl';

import { write } from '@/shared/constants/tools';

import { Container } from '@/shared/ui-kit/Container';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { LocaleLink } from '@/features/LocaleNavigation';
import { TextItem } from '../components/TextItem';
import { ToolItem } from '../components/ToolItem';

import styles from './MenuWrite.module.scss';

interface MenuWriteProps {
  isActive: boolean;
  setActiveItem: (value: null) => void
  className?: string;
}

export const MenuWrite:FC<MenuWriteProps> = ({ isActive, setActiveItem, className }) => {
  const t = useTranslations();
  const ai = write.slice(0, 4);
  const other = write.slice(4);
  return (
    <nav
      className={cn(
        styles.root,
        { [styles.active]: isActive },
        className,
        'bg-background-light dark:bg-background-dark shadow-menuLight dark:shadow-menuDark',
      )}
      onMouseLeave={() => setActiveItem(null)}
    >
      <Container className="flex gap-6">
        <div className="p-6 rounded-3xl bg-additionalGrey100-light dark:bg-additionalGrey100-dark">
          <Typography
            variant={TypographyVariants.SECONDARY}
            className="text-neutralsGrey500-light dark:text-grey2-dark uppercase"
          >
            {t('header.ai-tools')}
          </Typography>
          <ul className="mt-4">
            {ai.map((el) => (
              <ToolItem name={t(`features.${el.label}.name`)} description={t(`features.${el.label}.description`)} link={el.route} Icon={el.Icon} key={el.id} />
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-additionalGrey100-light dark:bg-additionalGrey100-dark">
          <Typography
            variant={TypographyVariants.SECONDARY}
            className="text-neutralsGrey500-light dark:text-grey2-dark uppercase"
          >
            {t('header.other-write-tools')}
          </Typography>
          <ul className="mt-4 grid grid-cols-2 gap-x-4">
            {other.map(({ id, label, route }) => <TextItem key={id} name={t(`features.${label}.name`)} link={route} />)}
            <li className="bg-transparent p-2 hover:bg-neutralsGrey300-light dark:hover:bg-grey1-dark rounded-xl">
              <LocaleLink href="/search">
                <Typography variant={TypographyVariants.SECONDARY} fontWeight="bold" className="text-secondaryGreen-light">
                  {t('header.all-write-tools')}
                </Typography>
              </LocaleLink>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
};
