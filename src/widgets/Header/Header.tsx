import cn from 'classnames';

import { Container } from '@/shared/ui-kit/Container';
import { HeaderDesktopView } from './HeaderDesktop/HeaderDesktopView';
import { HeaderMobileView } from './HeaderMobile/HeaderMobileView';
import { Logo } from './Logo';

import styles from './Header.module.scss';

export const Header = () => (
  <header className="sticky top-5 xl:top-0 z-[1000]">
    <div className="relative w-full xl:bg-background-light xl:dark:bg-background-dark">
      <Container className={cn(styles.header, 'py-4 my-5 bg-neutralsGrey100-light dark:bg-neutralsGrey100-dark xl:bg-transparent xl:dark:bg-transparent xl:my-0 xl:py-8 flex justify-between items-center rounded-2xl')}>
        <Logo />
        <HeaderDesktopView />
        <HeaderMobileView />
      </Container>
    </div>
  </header>
);
