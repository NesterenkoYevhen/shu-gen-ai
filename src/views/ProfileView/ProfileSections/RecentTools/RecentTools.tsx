/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { compareDesc, format } from 'date-fns';

import { useTranslations } from 'next-intl';
import { all } from '@/shared/constants/tools';

import { Button, ButtonSize, ButtonVariants } from '@/shared/ui-kit/Button';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import { getUserHistory } from '@/shared/actions/user';
import toast from 'react-hot-toast';
import { FeatureFileResponse } from '@/shared/types/common';
import { LoaderBlock } from '@/shared/ui-kit/LoaderBlock';
import { FaEye } from 'react-icons/fa';
import styles from './RecentTools.module.scss';

interface FeatureFileWithLabel extends FeatureFileResponse {
  label: string;
}

export const RecentTools = () => {
  const t = useTranslations();
  const [history, setHistory] = useState<FeatureFileWithLabel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const historyData = await getUserHistory();
        setHistory(
          historyData.map((tool) => ({
            ...tool,
            label: t(`features.${all.find((item) => item.api_key === tool.feature.key)?.label}.name`),
          })).sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))),
        );
      } catch (error) {
        toast.error(t('errors.fetch-cards'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const displayedTools = showAll ? history : history.slice(0, 3);

  if (isLoading) return <LoaderBlock />;

  return (
    <section className={cn('p-6 rounded-3xl flex flex-col gap-6 bg-additionalGrey100-light dark:bg-additionalGrey100-dark scroll-mt-32', styles.recentTools)} id="recent-tools">
      <Typography variant={TypographyVariants.TITLE_3}>{t('profile.recent-tools.title')}</Typography>
      {history.length ? (
        <>
          <div className="mt-2 w-full overflow-auto">
            <div className="grid grid-cols-[1fr_8fr_1fr] gap-x-6 min-w-[894px]">
              <Typography variant={TypographyVariants.TITLE_5}>{t('profile.recent-tools.date')}</Typography>
              <Typography variant={TypographyVariants.TITLE_5}>{t('profile.recent-tools.tools')}</Typography>
              <Typography variant={TypographyVariants.TITLE_5}>{t('profile.recent-tools.file')}</Typography>
            </div>
            <div className="w-full">
              {displayedTools.map((tool) => (
                <div key={tool.id} className={cn('grid grid-cols-[1fr_8fr_1fr] pb-2.5 gap-x-6 border-b border-grey1-light dark:border-grey1-dark py-4 min-w-[894px]', styles.toolItem)}>
                  <Typography variant={TypographyVariants.SECONDARY}>{format(new Date(tool.date), 'dd/MM/yy')}</Typography>
                  <Typography variant={TypographyVariants.SECONDARY}>{tool.label}</Typography>
                  <Typography variant={TypographyVariants.SECONDARY}>
                    <Link className="flex items-center gap-3" href={tool.file} target="_blank">
                      {t('profile.recent-tools.view')}
                      <FaEye className="text-xl text-text-light dark:text-text-dark" />
                    </Link>
                  </Typography>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant={ButtonVariants.SECONDARY}
            size={ButtonSize.SMALL}
            width="225px"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? t('profile.recent-tools.seeLess') : t('profile.recent-tools.seeMore')}
          </Button>
        </>
      ) : <Typography variant={TypographyVariants.MAIN} className="text-center">{t('profile.recent-tools.no-history')}</Typography>}

    </section>
  );
};
