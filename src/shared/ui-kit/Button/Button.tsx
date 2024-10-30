/* eslint-disable react/button-has-type */
import {
  HTMLAttributes, ReactNode, forwardRef,
} from 'react';
import cn from 'classnames';

import { Svg } from '@/shared/types/common';

import styles from './Button.module.scss';

export enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
  BORDER_RED = 'border-red',
  BORDER_GREY = 'border-grey',
}

export enum ButtonSize {
  DEFAULT = 'default',
  SMALL = 'small',
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  width: string;
  className?: string;
  children?: ReactNode | ReactNode[];
  variant?: ButtonVariants;
  type?: 'submit' | 'reset' | 'button';
  size?: ButtonSize;
  disabled?: boolean;
  StartIcon?: Svg;
  EndIcon?: Svg;
  startIconClassName?: string;
  endIconClassName?:string;
}
type Ref = HTMLButtonElement;
export const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    children,
    className,
    type = 'button',
    onClick,
    disabled = false,
    variant = ButtonVariants.PRIMARY,
    size = ButtonSize.DEFAULT,
    StartIcon,
    EndIcon,
    startIconClassName,
    endIconClassName,
    width,
    ...rest
  } = props;
  return (
    <button
      className={cn(styles.root, styles[variant], styles[size], className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{ width }}
      ref={ref}
      {...rest}
    >
      {StartIcon && (
        <StartIcon className={cn(styles.icon, styles.startIcon, startIconClassName)} />
      )}
      {children}
      {EndIcon
      && (
        <EndIcon className={cn(styles.icon, styles.endIcon, endIconClassName)} />
      )}
    </button>
  );
});
