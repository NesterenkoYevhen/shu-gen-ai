import { FC } from 'react';
import { IconType } from 'react-icons';

import { LocaleLink, PathnamesType } from '@/features/LocaleNavigation';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import { IMobileMenuConroller } from '../../HeaderMobileMenu/HeaderMobileMenu';

interface IFeatureItem extends IMobileMenuConroller {
  name: string,
  link: PathnamesType,
  Icon: IconType
}

export const FeatureItem:FC<IFeatureItem> = ({
  name, link, Icon, setActive,
}) => (
  <li className="bg-transparent rounded-xl">
    <LocaleLink href={link} className="flex items-center gap-4" onClick={() => setActive(false)}>
      <div className="p-1.5 rounded-full bg-background-light dark:bg-neutralsGrey600-light">
        <Icon className="text-xl text-neutralsGrey800-light dark:text-neutralsGrey800-dark" />
      </div>
      <Typography variant={TypographyVariants.MAIN}>{name}</Typography>
    </LocaleLink>
  </li>
);
