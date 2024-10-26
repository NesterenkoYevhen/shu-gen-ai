import { useTranslations } from 'next-intl';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { Plan } from './Plan/Plan';

export const Plans = () => {
  const t = useTranslations('main-page.plans');
  const plans = [
    {
      label: 'free-plan',
      features: [
        'feature1',
        'feature2',
        'feature3',
        'feature4',
      ],
    },
    {
      label: 'pro-plan',
      features: [
        'feature1',
        'feature2',
        'feature3',
        'feature4',
        'feature5',
        'feature6',
      ],
      isPopular: true,
    },
    {
      label: 'pro-plus-plan',
      features: [
        'feature1',
        'feature2',
        'feature3',
        'feature4',
        'feature5',
        'feature6',
      ],
    },
  ];

  return (
    <>
      <Typography variant={TypographyVariants.TITLE_2}>{t('title')}</Typography>
      <ul className="mt-10 flex justify-between flex-wrap gap-6">
        {plans.map((plan, index) => (
          <Plan key={index} {...plan} />
        ))}
      </ul>
    </>
  );
};
