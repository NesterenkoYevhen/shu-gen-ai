import { LocaleLink } from '@/features/LocaleNavigation';

import LogoLightDesktop from '@/assets/images/logo-light.svg';
import LogoDarkDesktop from '@/assets/images/logo-dark.svg';
import LogoLightMobile from '@/assets/images/logo-mobile-light.svg';
import LogoDarkMobile from '@/assets/images/logo-mobile-dark.svg';

export const Logo = () => (
  <LocaleLink href="/">
    <div className="hidden xl:block">
      <LogoLightDesktop className="block dark:hidden" />
      <LogoDarkDesktop className="hidden dark:block" />
    </div>
    <div className="block xl:hidden">
      <LogoLightMobile className="block dark:hidden" />
      <LogoDarkMobile className="hidden dark:block" />
    </div>
  </LocaleLink>
);
