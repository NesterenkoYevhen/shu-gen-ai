import { FC } from 'react';

import cn from 'classnames';

import MenuOpenIconLight from '@/assets/icons/mobile-menu-open-light.svg';
import MenuOpenIconDark from '@/assets/icons/mobile-menu-open-dark.svg';
import MenuCloseIconLight from '@/assets/icons/mobile-menu-close-light.svg';
import MenuCloseIconDark from '@/assets/icons/mobile-menu-close-dark.svg';
import SearchMobileIconLight from '@/assets/icons/search-mobile-light.svg';
import SearchMobileIconDark from '@/assets/icons/search-mobile-dark.svg';

interface IHeaderMobileControl {
  isMobileActive: boolean;
  setMobileActive: (value: boolean) => void;
}

export const HeaderMobileControl:FC<IHeaderMobileControl> = ({ isMobileActive, setMobileActive }) => (
  <div className="flex gap-2 items-center">
    <button type="button" className={cn({ hidden: isMobileActive })}>
      <SearchMobileIconLight className="block dark:hidden" />
      <SearchMobileIconDark className="hidden dark:block" />
    </button>
    <button type="button" className={cn({ hidden: isMobileActive })} onClick={() => setMobileActive(true)}>
      <MenuOpenIconLight className="block dark:hidden" />
      <MenuOpenIconDark className="hidden dark:block" />
    </button>
    <button type="button" className={cn({ hidden: !isMobileActive })} onClick={() => setMobileActive(false)}>
      <MenuCloseIconLight className="block dark:hidden" />
      <MenuCloseIconDark className="hidden dark:block" />
    </button>
  </div>
);
