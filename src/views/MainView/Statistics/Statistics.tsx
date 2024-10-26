import { FC } from 'react';

import { useTranslations } from 'next-intl';

import { all } from '@/shared/constants/tools';

import MetricsLogo from '@/assets/icons/main-page/metrics-logo.svg';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

interface StatisticCardProps {
  value: string;
  label: string;
}

const StatisticCard: FC<StatisticCardProps> = ({ value, label }) => (
  <div className="flex flex-col items-center gap-2">
    <Typography className="!text-[48px] tablet:!text-[64px]" fontWeight="bold">
      {value}
    </Typography>
    <Typography
      variant={TypographyVariants.MAIN}
      className="text-neutralsGrey700-light dark:text-neutralsGrey700-dark text-center"
    >
      {label}
    </Typography>
  </div>
);

export const Statistics = () => {
  const t = useTranslations('main-page.statistics');

  const stats = [
    { value: '10m', label: t('card1') },
    { value: '500k', label: t('card2') },
    { value: '1m', label: t('card3') },
    { value: String(all.length), label: t('card4') },
  ];

  return (
    <div className="flex justify-between flex-wrap tablet:flex-nowrap gap-24 tablet:gap-0">
      <div className="w-full tablet:w-[542px] flex flex-col justify-between gap-16 tablet:gap-0">
        <div className="flex items-center gap-6 w-full pb-5 border-b border-solid border-neutralsGrey300-light dark:border-neutralsGrey300-dark">
          <MetricsLogo />
          <Typography variant={TypographyVariants.TITLE_3}>
            {t('title')}
          </Typography>
        </div>
        <Typography
          variant={TypographyVariants.MAIN}
          className="w-full tablet:w-[514px] text-balance"
        >
          {t('description')}
        </Typography>
      </div>

      <div className="w-full tablet:w-[512px] grid grid-cols-2 place-items-center gap-6">
        {stats.map((stat, index) => (
          <StatisticCard key={index} value={stat.value} label={stat.label} />
        ))}
      </div>
    </div>
  );
};
