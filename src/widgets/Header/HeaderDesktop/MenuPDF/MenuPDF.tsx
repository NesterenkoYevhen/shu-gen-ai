import { FC } from 'react';
import cn from 'classnames';

import { useTranslations } from 'next-intl';

import { pdf } from '@/shared/constants/tools';

import { Container } from '@/shared/ui-kit/Container';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { ToolItem } from '../components/ToolItem';

import styles from './MenuPDF.module.scss';

interface MenuPDFProps {
  isActive: boolean;
  setActiveItem: (value: null) => void
  className?: string;
}

export const MenuPDF:FC<MenuPDFProps> = ({ isActive, setActiveItem, className }) => {
  const t = useTranslations();
  return (
    <nav
      className={cn(
        styles.root,
        { [styles.active]: isActive },
        className,
        'bg-additionalGrey100-light dark:bg-additionalGrey100-dark shadow-menuLight dark:shadow-menuDark',
      )}
      onMouseLeave={() => setActiveItem(null)}
    >
      <Container>
        <Typography
          variant={TypographyVariants.SECONDARY}
          className="text-neutralsGrey500-light dark:text-grey2-dark uppercase"
        >
          {t('header.pdf-tools')}
        </Typography>
        <ul className="mt-6 grid grid-cols-2 gap-4">
          {pdf.map((el) => (
            <ToolItem name={t(`features.${el.label}.name`)} description={t(`features.${el.label}.description`)} link={el.route} Icon={el.Icon} key={el.id} />
          ))}
        </ul>
      </Container>
    </nav>
  );
};
