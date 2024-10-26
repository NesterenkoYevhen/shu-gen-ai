/* eslint-disable jsx-a11y/no-static-element-interactions */
import { memo } from 'react';
import cn from 'classnames';

import { Svg } from '@/shared/types/common';

import { Typography, TypographyVariants } from '../Typography';

import styles from './Tab.module.scss';

export interface TabType {
  title:string;
}
interface TabsProps {
  className?: string;
  title:string;
  IconWhite: Svg;
  IconBlack: Svg;
  onClick?:()=>void;
  active?:boolean;
  disabled?:boolean;
}
export const Tab = memo(({
  className, title, IconWhite, IconBlack, onClick, active, disabled,
}:TabsProps) => (
  <div
    className={cn(styles.root, 'bg-additionalGrey200-light dark:bg-additionalGrey200-dark', className, { [styles.active]: active }, { [styles.disabled]: disabled })}
    onClick={onClick}
  >
    {active ? <IconBlack /> : (
      <>
        <IconBlack className="block dark:hidden" />
        <IconWhite className="hidden dark:block" />
      </>
    ) }

    <Typography
      variant={TypographyVariants.MAIN}
    >
      {title}
    </Typography>
  </div>

));
