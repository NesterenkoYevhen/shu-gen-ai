'use client';

import { useScreenSize } from '@/shared/hooks/useScreenSize';

import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ThemeToggler } from '@/features/ThemeToggler';
import { Search } from '@/features/Search';
import { HeaderDesktopNavigation } from '../HeaderDesktopNavigation/HeaderDesktopNavigation';
import { HeaderLogin } from '../HeaderLogin/HeaderLogin';

export const HeaderDesktopView = () => {
  const isSmXL = useScreenSize('1200');
  return !isSmXL ? (
    <>
      <HeaderDesktopNavigation />
      <div className="hidden xl:flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeToggler />
        <Search />
        <HeaderLogin />
      </div>
    </>
  ) : null;
};
