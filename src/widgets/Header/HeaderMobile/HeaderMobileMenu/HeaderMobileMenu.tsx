import { FC } from 'react';
import cn from 'classnames';

import { Container } from '@/shared/ui-kit/Container';
import { Search } from '@/features/Search';
import { ThemeToggler } from '@/features/ThemeToggler';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { HeaderMobileMenuPDF } from '../HeaderMobileMenuPDF';
import { HeaderMobileMenuImage } from '../HeaderMobileMenuImage';
import { HeaderMobileMenuWrite } from '../HeaderMobileMenuWrite';
import { HeaderMobileMenuVideo } from '../HeaderMobileMenuVideo';
import { HeaderMobileMenuFile } from '../HeaderMobileMenuFile';
import { HeaderMobileLogin } from '../HeaderMobileLogin';

import styles from './HeaderMobileMenu.module.scss';

interface IHeaderMobileMenu {
  isActive: boolean;
  setActive: (value: boolean) => void;
}

export interface IMobileMenuConroller {
  setActive: (value: boolean) => void;
}

export const HeaderMobileMenu:FC<IHeaderMobileMenu> = ({ isActive, setActive }) => (
  <nav className={cn(styles.root, 'bg-background-light dark:bg-background-dark', 'relative', { [styles.active]: isActive })}>
    <Container className="!p-0">
      <div className={cn(styles.contentContainer)}>
        <ul className="bg-neutralsGrey100-light dark:bg-neutralsGrey100-dark rounded-2xl">
          <HeaderMobileMenuPDF setActive={setActive} />
          <HeaderMobileMenuImage setActive={setActive} />
          <HeaderMobileMenuWrite setActive={setActive} />
          <HeaderMobileMenuFile setActive={setActive} />
          <HeaderMobileMenuVideo setActive={setActive} />
        </ul>
        <div className="flex justify-center mt-6"><Search /></div>
        <HeaderMobileLogin setActive={setActive} />

        <div className="flex justify-center mt-4 gap-4 items-center">
          <LanguageSwitcher />
          <ThemeToggler />
        </div>
      </div>
    </Container>
  </nav>
);
