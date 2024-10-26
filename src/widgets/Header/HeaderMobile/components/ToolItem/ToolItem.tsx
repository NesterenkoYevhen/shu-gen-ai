import { FC } from 'react';
import { IconType } from 'react-icons';

import { LocaleLink, PathnamesType } from '@/features/LocaleNavigation';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import { IMobileMenuConroller } from '../../HeaderMobileMenu/HeaderMobileMenu';

interface IToolItem extends IMobileMenuConroller {
  name: string,
  link: PathnamesType,
  description: string,
  Icon: IconType
}

export const ToolItem:FC<IToolItem> = ({
  name, link, description, Icon, setActive,
}) => (
  <li className="bg-transparent">
    <LocaleLink href={link} className="flex items-center gap-4" onClick={() => setActive(false)}>
      <div className="p-1.5 rounded-full bg-background-light dark:bg-neutralsGrey600-light">
        <Icon className="text-xl text-neutralsGrey800-light dark:text-neutralsGrey800-dark" />
      </div>
      <div className="flex flex-col gap-0.5">
        <Typography variant={TypographyVariants.MAIN}>{name}</Typography>
        <Typography variant={TypographyVariants.SECONDARY} className="text-neutralsGrey500-light dark:text-neutralsGrey500-dark">{description}</Typography>
      </div>
    </LocaleLink>
  </li>
);
