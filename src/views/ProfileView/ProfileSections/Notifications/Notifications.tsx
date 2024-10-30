import { useTranslations } from 'next-intl';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { NotificationSwitch } from './NotificationSwitch';

export const Notifications = () => {
  const t = useTranslations('profile.notifications');
  return (
    <section className="p-6 rounded-3xl flex flex-col gap-8 bg-additionalGrey100-light dark:bg-additionalGrey100-dark scroll-mt-32" id="notifications">
      <Typography variant={TypographyVariants.TITLE_3}>{t('title')}</Typography>
      <div className="flex justify-between flex-wrap gap-8 tablet:gap-0">

        <div className="w-full tablet:w-1/2">
          <Typography variant={TypographyVariants.TITLE_4}>{t('notification-1.title')}</Typography>
          <Typography variant={TypographyVariants.MAIN} className="mt-1 text-neutralsGrey600-light dark:text-neutralsGrey400-dark">
            {t('notification-1.subtitle')}
          </Typography>

          <NotificationSwitch
            title={t('notification-1.switch-1-title')}
            description={t('notification-1.switch-1-subtitle')}
            defaultChecked
          />
          <NotificationSwitch
            title={t('notification-1.switch-2-title')}
            description={t('notification-1.switch-2-subtitle')}
          />
        </div>

        <div className="w-full tablet:w-1/2">
          <Typography variant={TypographyVariants.TITLE_4}>{t('notification-2.title')}</Typography>
          <Typography variant={TypographyVariants.MAIN} className="mt-1 text-neutralsGrey600-light dark:text-neutralsGrey400-dark">
            {t('notification-2.subtitle')}
          </Typography>

          <NotificationSwitch
            title={t('notification-2.switch-1-title')}
            description={t('notification-2.switch-2-subtitle')}
          />
          <NotificationSwitch
            title={t('notification-2.switch-2-title')}
            description={t('notification-2.switch-2-subtitle')}
          />
        </div>

      </div>
    </section>
  );
};
