import {
  FC, HTMLAttributes, useId, useState,
} from 'react';

import cn from 'classnames';

import { FaCheck } from 'react-icons/fa';

import { Typography, TypographyVariants } from '../Typography';

import styles from './Checkbox.module.scss';

type InputAttributes = Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>;

interface CheckboxProps extends InputAttributes {
  className?: string;
  value?: boolean;
  error?: string | null;
  label: string;
  name: string;
  disabled?: boolean;
  labelStyle: string;
}

export const Checkbox: FC<CheckboxProps> = (props) => {
  const {
    className,
    value = false,
    label,
    name,
    disabled,
    error,
    labelStyle,
  } = props;

  const [isChecked, setIsChecked] = useState(value);
  const id = useId();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className={cn(styles.root, className, { [styles.error]: !!error })}>
      <div className={styles.inputWrap}>
        <input
          className={styles.input}
          disabled={disabled}
          onChange={changeHandler}
          checked={isChecked}
          type="checkbox"
          id={id}
          name={name}
        />
        <label htmlFor={id} className={cn(styles.label)}>
          <span className={styles.checkbox}>
            {isChecked && <FaCheck className="text-xs text-text-light dark:text-text-dark" />}
          </span>
          <Typography variant={TypographyVariants.LABEL} className={labelStyle} as="span">{label}</Typography>
        </label>
      </div>
    </div>
  );
};
