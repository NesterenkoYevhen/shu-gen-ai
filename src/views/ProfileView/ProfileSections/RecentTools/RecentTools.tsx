'use client';

import { useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { compareDesc, format } from 'date-fns';

import { useTranslations } from 'next-intl';

import { all } from '@/shared/constants/tools';

import { MdOutlineFileUpload } from 'react-icons/md';

import { Button, ButtonSize, ButtonVariants } from '@/shared/ui-kit/Button';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import styles from './RecentTools.module.scss';

const mockedRecentTools = [
  { id: 2, date: new Date(2024, 9, 10), url: 'https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf' },
  { id: 3, date: new Date(2024, 9, 11), url: 'https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf' },
  { id: 4, date: new Date(2024, 9, 12), url: 'https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf' },
  { id: 5, date: new Date(2024, 9, 13), url: 'https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf' },
  { id: 6, date: new Date(2024, 9, 14), url: 'https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf' },
  { id: 7, date: new Date(2024, 9, 15), url: 'https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf' },
];

export const RecentTools = () => {
  const t = useTranslations();
  const [showAll, setShowAll] = useState(false);

  const recentTools = mockedRecentTools.map((tool) => {
    const feature = all.find((item) => item.id === tool.id);
    return {
      ...tool,
      label: t(`features.${feature?.label}.name`),
    };
  }).sort((a, b) => compareDesc(a.date, b.date));

  const displayedTools = showAll ? recentTools : recentTools.slice(0, 3);

  return (
    <section className="p-6 rounded-3xl flex flex-col gap-6 bg-additionalGrey100-light dark:bg-additionalGrey100-dark scroll-mt-32" id="recent-tools">
      <Typography variant={TypographyVariants.TITLE_3}>{t('profile.recent-tools.title')}</Typography>
      <div className={cn('mt-2 w-full overflow-auto', styles.recentTools)}>
        <div className="grid grid-cols-[1fr_8fr_1fr] gap-x-6 min-w-[894px]">
          <Typography variant={TypographyVariants.TITLE_5}>{t('profile.recent-tools.date')}</Typography>
          <Typography variant={TypographyVariants.TITLE_5}>{t('profile.recent-tools.tools')}</Typography>
          <Typography variant={TypographyVariants.TITLE_5}>{t('profile.recent-tools.file')}</Typography>
        </div>
        <div className="w-full">
          {displayedTools.map((tool) => (
            <div key={tool.id} className="grid grid-cols-[1fr_8fr_1fr] pb-2.5 gap-x-6 border-b border-grey1-light dark:border-grey1-dark py-4 min-w-[894px]">
              <Typography variant={TypographyVariants.SECONDARY}>{format(tool.date, 'dd/MM/yy')}</Typography>
              <Typography variant={TypographyVariants.SECONDARY}>{tool.label}</Typography>
              <Typography variant={TypographyVariants.SECONDARY}>
                <Link className="flex items-center gap-3" href={tool.url} target="_blank">
                  {t('profile.recent-tools.view')}
                  <MdOutlineFileUpload className="text-xl text-text-light dark:text-text-dark" />
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
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? t('profile.recent-tools.seeLess') : t('profile.recent-tools.seeMore')}
      </Button>
    </section>
  );
};
