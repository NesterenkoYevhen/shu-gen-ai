import { useTranslations } from 'next-intl';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { Plan } from './Plan/Plan';

export const Plans = () => {
  const t = useTranslations('main-page.plans');
  const plans = [
    {
      id: 1,
      label: 'free-plan',
      features: ['feature1', 'feature2', 'feature3', 'feature4'],
    },
    {
      id: 2,
      label: 'pro-plan',
      features: ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'],
      isPopular: true,
    },
    {
      id: 3,
      label: 'pro-plus-plan',
      features: ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'],
    },
  ];

  return (
    <>
      <Typography variant={TypographyVariants.TITLE_2}>{t('title')}</Typography>
      <ul className="mt-10 flex flex-wrap gap-6 justify-center">
        {plans.map((plan, index) => (
          <Plan key={index} {...plan} />
        ))}
      </ul>
    </>
  );
};
