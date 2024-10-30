import {
  HTMLAttributes, HTMLInputTypeAttribute, memo, useId, useRef, useState,
} from 'react';

import cn from 'classnames';

import { Svg } from '@/shared/types/common';

import ErrorIcon from '@/assets/icons/error-icon.svg';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

import { Typography, TypographyVariants } from '../Typography';

import styles from './Textfield.module.scss';

type InputAttributes = Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>;

export interface TextfieldProps extends InputAttributes {
  name: string;
  label: string;
  isRequired?:boolean;
  onChange?: (value:string) => void;
  className?: string;
  type?: HTMLInputTypeAttribute;
  error?: string | null;
  placeholder?: string;
  ActionIcon?: Svg;
  complete?: boolean;
  onActionClick?: () => void;
  min?: number;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  value?: string;
}

export const Textfield = memo((props: TextfieldProps) => {
  const {
    className,
    label,
    isRequired = false,
    placeholder,
    type = 'text',
    error,
    name,
    onChange,
    ActionIcon,
    onActionClick,
    complete,
    min,
    disabled = false,
    ...rest
  } = props;
  const [focused, setFocused] = useState(false);
  const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const mods = {
    [styles.focused]: focused,
    [styles.error]: !!error,
    [styles.complete]: complete,
  };

  return (
    <div className={cn(styles.root, className, mods, 'relative mb-4')}>
      <div className="flex items-start gap-1 mb-1">
        <Typography
          variant={TypographyVariants.MAIN}
          htmlFor={id}
          as="label"
          className={cn('block', className)}
        >
          {label}
        </Typography>
        {isRequired && <div className="w-[4px] h-[4px] rounded-full bg-systemRed" />}
      </div>

      <div className={cn(styles.control)}>
        <input
          ref={inputRef}
          className={cn(styles.input)}
          name={name}
          placeholder={placeholder}
          id={id}
          type={type === 'password' ? passwordType : type}
          onFocus={onFocus}
          min={min}
          disabled={disabled}
          onBlur={onBlur}
          onChange={(e) => onChange && onChange(e.target.value)}
          {...rest}
        />
        {
          type === 'password' && (passwordType === 'password' ? <BsEyeSlash onClick={() => setPasswordType('text')} className="cursor-pointer ml-auto text-2xl text-neutralsGrey400-light mr-4" /> : <BsEye onClick={() => setPasswordType('password')} className="cursor-pointer ml-auto text-2xl text-neutralsGrey400-light mr-4" />)
        }
      </div>

      <div className="flex gap-2 items-center absolute left-0 bottom-[-25px]">
        {error && (
        <>
          <ErrorIcon />
          <Typography variant={TypographyVariants.ERROR}>{error.toString()}</Typography>
        </>
        )}
      </div>

    </div>
  );
});
