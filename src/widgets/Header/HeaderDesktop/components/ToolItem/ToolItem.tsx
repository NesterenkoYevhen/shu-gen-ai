import { FC } from 'react';
import { IconType } from 'react-icons';

import { LocaleLink, PathnamesType } from '@/features/LocaleNavigation';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

interface IToolItem {
  name: string,
  link: PathnamesType,
  description?: string,
  Icon: IconType
}

export const ToolItem:FC<IToolItem> = ({
  name, link, description, Icon,
}) => (
  <li className="bg-transparent hover:bg-neutralsGrey300-light dark:hover:bg-grey1-dark rounded-xl p-1">
    <LocaleLink href={link} className="flex items-center gap-4">
      <div className="p-1.5 rounded-full bg-background-light dark:bg-neutralsGrey600-light">
        <Icon className="text-xl text-neutralsGrey800-light dark:text-neutralsGrey800-dark" />
      </div>
      <div className="flex flex-col gap-0.5">
        <Typography variant={TypographyVariants.MAIN}>{name}</Typography>
        {description && <Typography variant={TypographyVariants.SECONDARY} className="text-neutralsGrey500-light dark:text-neutralsGrey500-dark">{description}</Typography>}
      </div>
    </LocaleLink>
  </li>
);
