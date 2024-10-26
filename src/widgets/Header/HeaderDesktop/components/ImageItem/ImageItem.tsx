import { FC } from 'react';
import { StaticImageData } from 'next/image';

import { LocaleLink, PathnamesType } from '@/features/LocaleNavigation';
import { AppImage } from '@/shared/ui-kit/AppImage';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import ArrowLight from '@/assets/icons/arrow-light.svg';
import ArrowDark from '@/assets/icons/arrow-dark.svg';

interface IImageItem {
  name: string;
  description: string;
  link: PathnamesType;
  image: StaticImageData
}

export const ImageItem:FC<IImageItem> = ({
  name, description, link, image,
}) => (
  <li className="w-[31%] bg-transparent hover:bg-neutralsGrey200-light dark:hover:bg-grey1-dark rounded-xl p-2 cursor-pointer">
    <LocaleLink href={link} className="flex flex-col gap-2">
      <div className="h-[159px]">
        <AppImage alt={name} className="rounded-2xl" src={image} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Typography variant={TypographyVariants.TITLE_5}>{name}</Typography>
          <Typography variant={TypographyVariants.SECONDARY} className="text-neutralsGrey500-light dark:text-neutralsGrey500-dark">{description}</Typography>
        </div>
        <ArrowLight className="block dark:hidden" />
        <ArrowDark className="hidden dark:block" />
      </div>
    </LocaleLink>
  </li>
);
