import { FC } from 'react';
import Link from 'next/link';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import { Svg } from '@/shared/types/common';

interface IProfileNavItem {
  href: string;
  lightIcon: Svg;
  darkIcon: Svg;
  label: string;
}

export const ProfileNavItem:FC<IProfileNavItem> = ({
  href, lightIcon: LightIcon, darkIcon: DarkIcon, label,
}) => (
  <li>
    <Link href={href} className="py-2.5 px-4 rounded-2xl bg-additionalGrey200-light dark:bg-additionalGrey200-dark flex items-center gap-3">
      <LightIcon className="block dark:hidden" />
      <DarkIcon className="hidden dark:block" />
      <Typography variant={TypographyVariants.MAIN} className="text-nowrap">{label}</Typography>
    </Link>
  </li>
);
