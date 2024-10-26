import { FC } from 'react';

import { LocaleLink, PathnamesType } from '@/features/LocaleNavigation';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

interface ITextItem {
  name: string,
  link: PathnamesType
}

export const TextItem:FC<ITextItem> = ({ name, link }) => (
  <li className="bg-transparent hover:bg-neutralsGrey300-light dark:hover:bg-grey1-dark rounded-xl p-2">
    <LocaleLink href={link} className="flex items-center gap-4">
      <Typography variant={TypographyVariants.SECONDARY}>{name}</Typography>
    </LocaleLink>
  </li>
);
