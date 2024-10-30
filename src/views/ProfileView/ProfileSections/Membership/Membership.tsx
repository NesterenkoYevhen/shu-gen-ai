import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

import { tarrifs } from '@/shared/constants/tarrifs';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { ChangePlan } from './ChangePlan';
import { CancelMembership } from './CancelMembership';

const mockedUserTariff = {
  id: 'PRO',
  end_date: new Date(2024, 10, 18),
};

export const Membership = () => {
  const t = useTranslations();
  const userTariff = tarrifs.find((el) => mockedUserTariff.id === el.id);

  return (
    <section className="p-6 rounded-3xl flex flex-col gap-6 bg-additionalGrey100-light dark:bg-additionalGrey100-dark scroll-mt-32" id="membership">
      <Typography variant={TypographyVariants.TITLE_3}>{t('profile.membership.title')}</Typography>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <Typography variant={TypographyVariants.TITLE_4}>{t(userTariff?.label)}</Typography>
          <Typography variant={TypographyVariants.MAIN}>
            {t('profile.membership.next-billing')}
            {' '}
            <Typography variant={TypographyVariants.TITLE_5} as="span">
              {format(mockedUserTariff.end_date, 'MMMM d, yyyy')}
            </Typography>
          </Typography>
        </div>
        <Typography variant={TypographyVariants.MAIN}>{userTariff?.price}</Typography>
      </div>
      <div className="flex gap-2 flex-wrap tablet:flex-nowrap">
        <ChangePlan />
        <CancelMembership />
      </div>
    </section>
  );
};
