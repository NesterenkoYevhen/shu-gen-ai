import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { getServerSession } from 'next-auth';
import { authOptions, CustomSession } from '@/shared/lib/auth';
import { ChangePlan } from './ChangePlan';
import { CancelMembership } from './CancelMembership';

export const Membership = async () => {
  const t = useTranslations();
  const { subscription } = await getServerSession(authOptions) as CustomSession;

  return (
    <section className="p-6 rounded-3xl flex flex-col gap-6 bg-additionalGrey100-light dark:bg-additionalGrey100-dark scroll-mt-32" id="membership">
      <Typography variant={TypographyVariants.TITLE_3}>{t('profile.membership.title')}</Typography>
      { subscription ? (
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <Typography variant={TypographyVariants.TITLE_4}>{t(subscription.label)}</Typography>
            <Typography variant={TypographyVariants.MAIN}>
              {t('profile.membership.next-billing')}
              {' '}
              <Typography variant={TypographyVariants.TITLE_5} as="span">
                {format(subscription.end_date, 'MMMM d, yyyy')}
              </Typography>
            </Typography>
          </div>
          <Typography variant={TypographyVariants.MAIN}>{subscription.price}</Typography>
        </div>
      ) : <Typography variant={TypographyVariants.MAIN} className="text-center">{t('profile.membership.no-memebership')}</Typography>}
      <div className="flex gap-2 flex-wrap tablet:flex-nowrap">
        <ChangePlan />
        <CancelMembership />
      </div>
    </section>
  );
};
