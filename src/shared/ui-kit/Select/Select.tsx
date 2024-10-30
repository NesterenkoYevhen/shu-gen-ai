import { memo } from 'react';
import cn from 'classnames';
import Dropdown, { Option } from 'react-dropdown';
import { DropdownList } from '@/shared/types/common';
import ChevronBlack from '@/assets/icons/chevron-black.svg';
import ChevronWhite from '@/assets/icons/chevron-white.svg';
import 'react-dropdown/style.css';
import styles from './Select.module.scss';

interface DropdownProps {
  className?: string;
  list: DropdownList[];
  value?: DropdownList | Option;
  onChange: (item: Option) => void;
  placeholder?: string;
}

export const Select = memo(({
  className, list, value, onChange, placeholder = 'Сортування',
}: DropdownProps) => (
  <div className={cn(styles.root, className)}>
    <Dropdown
      options={list}
      controlClassName={styles.dropdown}
      menuClassName={styles.menu}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      placeholderClassName={styles.placeholder}
      arrowOpen={(
        <>
          <ChevronBlack className={cn(styles.icon, 'dark:hidden block')} />
          <ChevronWhite className={cn(styles.icon, 'dark:block hidden')} />
        </>
      )}
      arrowClosed={(
        <>
          <ChevronBlack className={cn(styles.icon, styles.iconOpen, 'dark:hidden block')} />
          <ChevronWhite className={cn(styles.icon, styles.iconOpen, 'dark:block hidden')} />
        </>
      )}
    />
  </div>
));
