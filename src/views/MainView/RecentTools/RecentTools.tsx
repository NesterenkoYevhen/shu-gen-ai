import cn from 'classnames';

import { all } from '@/shared/constants/tools';

import { LocaleLink } from '@/features/LocaleNavigation';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import { getTranslations } from 'next-intl/server';
import { getUserRecentTools } from '@/shared/actions/user';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/lib/auth';
import styles from './RecentTools.module.scss';

export const RecentTools = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const t = await getTranslations();
  const recentTools = await getUserRecentTools();
  const recentToolsNames = recentTools.map((recentTool) => all.find((feature) => feature.api_key === recentTool.key)).map((feature) => ({
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
