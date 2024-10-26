import cn from 'classnames';

import { useTranslations } from 'next-intl';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import styles from './Ticker.module.scss';

export const Ticker = () => {
  const t = useTranslations('main-page');
  return (
    <div className={styles.root}>
      <div className={styles.tickerM1}>
        <div className={cn(styles['ticker-wrap'], 'bg-additionalGrey200-light dark:bg-additionalGrey200-dark')}>
          <div className={styles.ticker}>
            <span className={styles['item-collection-1']}>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
            </span>
            <span className={styles['item-collection-2']}>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
              <Typography variant={TypographyVariants.TITLE_1} className={cn('text-white', styles.item)}>{t('ticker-text')}</Typography>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
