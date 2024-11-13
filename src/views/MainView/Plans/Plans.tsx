import { useTranslations } from 'next-intl';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { PlanAPIType } from '@/shared/types/common';
import { Plan } from './Plan/Plan';

export const Plans = () => {
  const t = useTranslations('main-page.plans');
  const plans: { id: PlanAPIType, label: string, features: string[], isPopular?: boolean, duration: number }[] = [
    {
      id: 'trial',
      label: 'free-plan',
      features: ['feature1', 'feature2', 'feature3', 'feature4'],
      duration: 3,
    },
    {
      id: 'advanced',
      label: 'pro-plan',
      features: ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'],
      isPopular: true,
      duration: 30,
    },
    {
      id: 'pro',
      label: 'pro-plus-plan',
      features: ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'],
      duration: 30,
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
