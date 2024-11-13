'use client';

import { useState, useRef, FC } from 'react';
import cn from 'classnames';
import { useTranslations } from 'next-intl';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { Button, ButtonSize, ButtonVariants } from '@/shared/ui-kit/Button';
import { UserResponse } from '@/shared/types/common';
import { signOut } from 'next-auth/react';
import { logout } from '@/shared/actions/user';
import { LocaleLink } from '../LocaleNavigation';

interface ILoggedInDropdown {
  user: UserResponse;
}

export const LoggedInDropdown: FC<ILoggedInDropdown> = ({ user }) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, setIsOpen, false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      await logout();

      await signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button className="w-[48px] h-[48px] bg-secondaryGreen-light flex items-center justify-center text-background-light text-2xl font-semibold rounded-full" type="button" onClick={toggleDropdown}>
        {user?.first_name?.toUpperCase().substring(0, 1) || 'U'}
      </button>

      <div
        className={cn(
          'absolute bottom-[63px] right-[-103px] xl:bottom-auto xl:right-0 xl:top-16 py-4 px-6 rounded-2xl border border-solid border-grey1-light dark:border-none bg-background-light dark:bg-additionalGrey400-dark w-[254px] transition-all duration-300 transform',
          {
            'opacity-100 scale-100': isOpen,
            'opacity-0 scale-95 pointer-events-none': !isOpen,
          },
        )}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-[40px] h-[40px] bg-secondaryGreen-light flex items-center justify-center text-background-light text-2xl font-semibold rounded-full">
            {user?.first_name?.toUpperCase().substring(0, 1) || 'U'}
          </div>
          <div className="flex flex-col gap-0.5">
            <Typography variant={TypographyVariants.TITLE_5} fontWeight="bold">{user.first_name || 'User'}</Typography>
            <Typography variant={TypographyVariants.SECONDARY}>{user.email}</Typography>
          </div>
        </div>
        <ul className="flex flex-col mt-4">
          <LocaleLink href="/profile" onClick={() => setIsOpen(false)}>
            <li className="py-3 border-b border-solid border-grey1-light dark:border-grey1-dark w-full cursor-pointer">
              <Typography variant={TypographyVariants.MAIN}>{t('logged-in-dropdown.settings')}</Typography>
            </li>
          </LocaleLink>
        </ul>
        <Button variant={ButtonVariants.BORDER_RED} width="100%" className="mt-4" size={ButtonSize.SMALL} onClick={handleLogout}>
          {t('logged-in-dropdown.logout')}
        </Button>
      </div>
    </div>
  );
};
