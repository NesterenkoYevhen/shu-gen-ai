import cn from 'classnames';

import { useTranslations } from 'next-intl';

import { Button, ButtonColors, ButtonVariants } from '@/shared/ui-kit/Button';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import TickBlack from '@/assets/icons/main-page/tick-black.svg';
import TickWhite from '@/assets/icons/main-page/tick-white.svg';

const PlanFeatures = ({ features }: { features: string[] }) => (
  <ul className="flex flex-col gap-4 mt-8">
    {features.map((feature, index) => (
      <li key={index} className="flex gap-3 items-center">
        <div className="w-[24px] h-[24px]">
          <TickBlack className="block dark:hidden" />
          <TickWhite className="hidden dark:block" />
        </div>
        <Typography>{feature}</Typography>
      </li>
    ))}
  </ul>
);

export const Plan = ({
  label, features, isPopular = false,
}: {
  label: string;
  features: string[];
  isPopular?: boolean;
}) => {
  const t = useTranslations('main-page.plans');
  return (
    <li className={cn('relative p-10 rounded-2xl border border-solid border-neutralsGrey300-light dark:border-neutralsGrey300-dark w-full tablet:w-[406px]', {
      'bg-additionalGrey200-light dark:bg-additionalGrey200-dark': isPopular,
    })}
    >
      {isPopular && (
      <div className="absolute top-[-16px] left-6 z-2 py-1 px-3 bg-background-light dark:bg-background-dark rounded-2xl border border-solid border-neutralsGrey300-light dark:border-neutralsGrey300-dark">
        <Typography variant={TypographyVariants.SECONDARY} className="text-secondaryGreen-light">{t('popular')}</Typography>
      </div>
      )}
      <Typography fontWeight="tiny" className="text-neutralsGrey600-light dark:text-neutralsGrey600-dark uppercase">{t(`${label}.title`)}</Typography>
      <div className="flex gap-2 items-end mt-0.5">
        <Typography variant={TypographyVariants.TITLE_3}>{t(`${label}.price`)}</Typography>
        <Typography variant={TypographyVariants.MAIN}>{t(`${label}.period`)}</Typography>
      </div>
      <Button color={ButtonColors.GREEN} variant={isPopular ? ButtonVariants.PRIMARY : ButtonVariants.SECONDARY} width="205px" className="mt-4">
        {t('subscribe')}
      </Button>
      <PlanFeatures features={features.map((el) => t(`${label}.${el}`))} />
    </li>
  );
};
