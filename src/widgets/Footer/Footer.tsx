import { useTranslations } from 'next-intl';

import { Container } from '@/shared/ui-kit/Container';

import { LocaleLink, PathnamesType } from '@/features/LocaleNavigation';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import LogoLightDesktop from '@/assets/images/logo-light.svg';
import LogoDarkDesktop from '@/assets/images/logo-dark.svg';
import LogoLightMobile from '@/assets/images/logo-mobile-light.svg';
import LogoDarkMobile from '@/assets/images/logo-mobile-dark.svg';
import PhoneLight from '@/assets/icons/main-page/phone-icon-light.svg';
import PhoneDark from '@/assets/icons/main-page/phone-icon-dark.svg';
import EmailLight from '@/assets/icons/main-page/email-icon-light.svg';
import EmailDark from '@/assets/icons/main-page/email-icon-dark.svg';
import FacebookLight from '@/assets/icons/main-page/facebook-icon-light.svg';
import FacebookDark from '@/assets/icons/main-page/facebook-icon-dark.svg';
import InstaLight from '@/assets/icons/main-page/insta-icon-light.svg';
import InstaDark from '@/assets/icons/main-page/insta-icon-dark.svg';

import { Svg } from '@/shared/types/common';

const Logos = {
  desktop: { light: LogoLightDesktop, dark: LogoDarkDesktop },
  mobile: { light: LogoLightMobile, dark: LogoDarkMobile },
};

interface SocialItem {
  Light: Svg;
  Dark: Svg;
  href: PathnamesType;
}

const icons: SocialItem[] = [
  { Light: PhoneLight, Dark: PhoneDark, href: '/' },
  { Light: EmailLight, Dark: EmailDark, href: '/' },
  { Light: FacebookLight, Dark: FacebookDark, href: '/' },
  { Light: InstaLight, Dark: InstaDark, href: '/' },
];

interface NavLinkItem {
  label: string;
  href: PathnamesType;
}

const navLinks:NavLinkItem[] = [
  { label: 'home', href: '/' },
  { label: 'privacy', href: '/' },
  { label: 'tos', href: '/' },
  { label: 'contract', href: '/' },
];

const Logo = ({ type }: { type: 'desktop' | 'mobile' }) => {
  const LogoLight = Logos[type].light;
  const LogoDark = Logos[type].dark;

  return (
    <>
      <LogoLight className="block dark:hidden" />
      <LogoDark className="hidden dark:block" />
    </>
  );
};

const Navigation = () => {
  const t = useTranslations('footer');
  return (
    <div>
      <div className="flex gap-5 items-center">
        <Typography variant={TypographyVariants.TITLE_4}>{t('navigation')}</Typography>
        <div className="border border-solid border-grey1-light dark:border-grey1-dark w-full" />
      </div>
      <ul className="mt-6 flex flex-col gap-4">
        {navLinks.map(({ label, href }) => (
          <li key={label}>
            <LocaleLink href={href}>
              <Typography variant={TypographyVariants.MAIN}>{t(label)}</Typography>
            </LocaleLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Footer = () => {
  const t = useTranslations('footer');
  return (
    <footer className="mt-20 sm:mt-[140px] mb-6">
      <Container className="bg-additionalGrey200-light dark:bg-additionalGrey200-dark p-10 rounded-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr,1fr,1fr] gap-6 tablet:gap-[71px]">
          <div className="hidden xl:block mb-4 sm:mb-0">
            <Logo type="desktop" />
          </div>
          <div className="block xl:hidden mb-4 sm:mb-0">
            <Logo type="mobile" />
          </div>
          <Navigation />
          <Navigation />
          <Navigation />
        </div>
        <div className="flex justify-between items-center mt-[73px] flex-wrap gap-6">
          <Typography variant={TypographyVariants.MAIN} className="text-neutralsGrey600-light dark:text-neutralsGrey600-dark">
            {t('copyright')}
          </Typography>
          <ul className="flex items-center gap-6">
            {icons.map(({ Light, Dark, href }, index) => (
              <li key={index}>
                <LocaleLink href={href}>
                  <Light className="block dark:hidden" />
                  <Dark className="hidden dark:block" />
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
};
