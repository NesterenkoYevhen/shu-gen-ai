'use client';

import { useState } from 'react';

import cn from 'classnames';

import { useTranslations } from 'next-intl';

import Chevron from '@/assets/icons/chevron-grey.svg';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { MenuImage } from '../MenuImage';
import { MenuFile } from '../MenuFile/MenuFile';
import { MenuPDF } from '../MenuPDF/MenuPDF';
import { MenuVideo } from '../MenuVideo/MenuVideo';
import { MenuWrite } from '../MenuWrite/MenuWrite';

import styles from './HeaderDesktopNavigation.module.scss';

type Navigation = 'pdf' | 'image' | 'write' | 'video' | 'file';

const NAV_ITEMS: { type: Navigation; label: string }[] = [
  { type: 'pdf', label: 'features.pdf.name' },
  { type: 'image', label: 'features.image.name' },
  { type: 'write', label: 'features.write.name' },
  { type: 'video', label: 'features.video.name' },
  { type: 'file', label: 'features.file.name' },
];

export const HeaderDesktopNavigation = () => {
  const t = useTranslations();
  const [activeItem, setActiveItem] = useState<Navigation | null>(null);

  const handleMouseEnterNavigation = (type: Navigation) => {
    setActiveItem(type);
  };
  return (
    <div>
      <ul className="hidden xl:flex bg-neutralsGrey100-light dark:bg-neutralsGrey100-dark rounded-3xl">
        {NAV_ITEMS.map(({ type, label }) => (
          <li
            key={type}
            className={cn('bg-transparent rounded-3xl flex gap-1 items-center px-4 py-3 cursor-pointer transition-all duration-400', {
              '!bg-secondaryPurple-light text-neutralsGrey800-light': activeItem === type,
            })}
            onMouseEnter={() => handleMouseEnterNavigation(type)}
          >
            <Typography variant={TypographyVariants.MAIN}>{t(label)}</Typography>
            <Chevron
              className={cn({
                [styles.chevronActive]: activeItem === type,
                'rotate-180': activeItem === type,
                'rotate-0': activeItem !== type,
              })}
            />
          </li>
        ))}
      </ul>
      <MenuPDF
        isActive={activeItem === 'pdf'}
        setActiveItem={setActiveItem}
      />
      <MenuImage
        isActive={activeItem === 'image'}
        setActiveItem={setActiveItem}
      />
      <MenuWrite
        isActive={activeItem === 'write'}
        setActiveItem={setActiveItem}
      />
      <MenuVideo
        isActive={activeItem === 'video'}
        setActiveItem={setActiveItem}
      />
      <MenuFile
        isActive={activeItem === 'file'}
        setActiveItem={setActiveItem}
      />
    </div>
  );
};
