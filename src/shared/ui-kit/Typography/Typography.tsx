import {
  ComponentProps, CSSProperties, ElementType, memo, ReactNode, useMemo,
} from 'react';

import cn from 'classnames';

import styles from './Typography.module.scss';

export type FontWeight = 'tiny' | 'regular' | 'bold';
export enum TypographyVariants {
  TITLE_1 = 'title-1',
  TITLE_2 = 'title-2',
  TITLE_3 = 'title-3',
  TITLE_4 = 'title-4',
  TITLE_5 = 'title-5',
  MAIN = 'main',
  SECONDARY = 'secondary',
  SMALL = 'small',
  LABEL = 'label',
  BUTTON = 'button',
  ERROR = 'error',
}
interface TypographyOwnProps<E extends ElementType = ElementType> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  variant?: TypographyVariants;
  fontWeight?:FontWeight;
  as?: E;
}

type TypographyProps<E extends ElementType>
  = TypographyOwnProps<E> & Omit<ComponentProps<E>, keyof TypographyOwnProps>;

const defaultElement = 'p';

export const Typography = memo(<E extends ElementType =
  typeof defaultElement>(props: TypographyProps<E>) => {
  const {
    as, children, variant = TypographyVariants.MAIN, className, style, fontWeight, ...rest
  } = props;
  const Component = useMemo(() => {
    if (as) return as;
    switch (variant) {
      case TypographyVariants.LABEL:
        return 'label';
      case TypographyVariants.TITLE_1:
        return 'h1';
      case TypographyVariants.TITLE_2:
        return 'h2';
      case TypographyVariants.TITLE_3:
        return 'h3';
      case TypographyVariants.TITLE_4:
        return 'h4';
      case TypographyVariants.TITLE_5:
        return 'h5';
      default:
        return 'p';
    }
  }, [variant, as]);
  return (
    <Component
      style={style}
      className={cn(styles.root, styles[variant], styles[fontWeight || ''], className)}
      {...rest}
    >
      {children}
    </Component>
  );
});
