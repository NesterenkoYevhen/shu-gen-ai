import { FC } from 'react';

import { LocaleLink, PathnamesType } from '@/features/LocaleNavigation';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import { IMobileMenuConroller } from '../../HeaderMobileMenu/HeaderMobileMenu';

interface IOtherItem extends IMobileMenuConroller {
  name: string,
  link: PathnamesType
}

export const OtherItem:FC<IOtherItem> = ({ name, link, setActive }) => (
  <li className="bg-transparent rounded-xl">
    <LocaleLink href={link} className="flex items-center gap-4" onClick={() => setActive(false)}>
      <Typography variant={TypographyVariants.SECONDARY}>{name}</Typography>
    </LocaleLink>
  </li>
);
