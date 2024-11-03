'use client';

import {
  HTMLAttributes, memo, useId, useState, useRef,
} from 'react';

import cn from 'classnames';

import styles from './Textarea.module.scss';

type TextareaAttributes = Omit<HTMLAttributes<HTMLTextAreaElement>, 'onChange'>;

export interface TextareaProps extends TextareaAttributes {
  name: string;
  isRequired?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  value?: string;
  height?: string | number;
}

export const Textarea = memo((props: TextareaProps) => {
  const {
    className,
    placeholder,
    name,
    onChange,
    maxLength = 100,
    value = '',
    height = '100px',
    ...rest
  } = props;
  const [focused, setFocused] = useState(false);
  const [currentLength, setCurrentLength] = useState(value.length);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const id = useId();

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setCurrentLength(newValue.length);
      onChange?.(newValue);
    }
  };

  const mods = {
    [styles.focused]: focused,
  };

  return (
    <div className={cn(styles.root, className, mods, 'relative mb-4')}>
      <div className={cn(styles.control)}>
        <textarea
          ref={textareaRef}
          className={cn(styles.textarea)}
          name={name}
          placeholder={placeholder}
          id={id}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={value}
          maxLength={maxLength}
          style={{ height }}
          {...rest}
        />
      </div>

      <div className="text-right text-sm text-neutralsGrey400-light mt-1">
        {currentLength}
        /
        {maxLength}
      </div>
    </div>
  );
});
