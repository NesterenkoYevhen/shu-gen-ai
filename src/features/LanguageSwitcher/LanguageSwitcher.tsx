'use client';

import { useState, useRef } from 'react';
import cn from 'classnames';

import { usePathname } from 'next/navigation';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import ChevronBlack from '@/assets/icons/chevron-black.svg';
import ChevronWhite from '@/assets/icons/chevron-white.svg';

import { LocaleLink } from '../LocaleNavigation';

type Language = 'en' | 'ua';

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const pathLocale = pathname.split('/')[1] || 'en';
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, setIsOpen, false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const languages: { locale: Language, label: string }[] = [
    { locale: 'en', label: 'English' },
    { locale: 'ua', label: 'Українська' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button className="flex gap-1 items-center" type="button" onClick={toggleDropdown}>
        <Typography variant={TypographyVariants.MAIN}>{pathLocale.toUpperCase()}</Typography>
        <ChevronWhite className={cn('hidden dark:block transition-transform duration-300', {
          'rotate-180': isOpen,
          'rotate-0': !isOpen,
        })}
        />
        <ChevronBlack className={cn('block dark:hidden transition-transform duration-300', {
          'rotate-180': isOpen,
          'rotate-0': !isOpen,
        })}
        />
      </button>

      <ul
        className={cn(
          'absolute bottom-[40px] right-[-132px] xl:right-auto xl:bottom-auto xl:left-0 xl:top-10 py-4 px-6 rounded-2xl border border-solid border-grey1-light dark:border-none bg-background-light dark:bg-additionalGrey400-dark w-[254px] transition-all duration-300 transform',
          {
            'opacity-100 scale-100': isOpen,
            'opacity-0 scale-95 pointer-events-none': !isOpen,
          },
        )}
      >
        {languages.map(({ locale, label }) => (
          <LocaleLink href="/" locale={locale} key={locale}>
            <li className="py-3.5 border-b border-solid border-grey1-light dark:border-grey1-dark w-full cursor-pointer">
              <Typography variant={TypographyVariants.MAIN}>{label}</Typography>
            </li>
          </LocaleLink>
        ))}
      </ul>
    </div>
  );
};
