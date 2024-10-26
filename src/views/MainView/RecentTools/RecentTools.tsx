import { useTranslations } from 'next-intl';
import cn from 'classnames';

import { all } from '@/shared/constants/tools';

import { LocaleLink } from '@/features/LocaleNavigation';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import styles from './RecentTools.module.scss';

const mockedRecentToolsIds = [1, 5, 10, 15, 20];

export const RecentTools = () => {
  const t = useTranslations();
  const recentToolsNames = mockedRecentToolsIds.map((id) => all.find((feature) => feature.id === id)).map((feature) => ({
    id: feature?.id,
    label: t(`features.${feature?.label}.name`),
    link: feature?.route || '/',
  }));
  return (
    <section className={cn('flex gap-2 items-center overflow-auto', styles.recentTools)}>
      <Typography variant={TypographyVariants.MAIN} as="h5" className="text-nowrap">{t('main-page.recent-tools')}</Typography>
      {recentToolsNames.map((el) => <LocaleLink href={el.link} key={el.id}><Typography variant={TypographyVariants.MAIN} className="py-2 px-4 rounded-lg bg-additionalGrey200-light dark:bg-additionalGrey200-dark text-nowrap">{el.label}</Typography></LocaleLink>)}
    </section>
  );
};
