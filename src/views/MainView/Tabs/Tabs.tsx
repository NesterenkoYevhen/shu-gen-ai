'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import {
  all, file, image, pdf, video, write,
} from '@/shared/constants/tools';

import { Tab } from '@/shared/ui-kit/Tab';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { Button, ButtonVariants } from '@/shared/ui-kit/Button';

import { LocaleLink } from '@/features/LocaleNavigation';

import AllTabWhite from '@/assets/icons/main-page/tabs/all-white.svg';
import AllTabBlack from '@/assets/icons/main-page/tabs/all-black.svg';
import PDFTabWhite from '@/assets/icons/main-page/tabs/pdf-white.svg';
import PDFTabBlack from '@/assets/icons/main-page/tabs/pdf-black.svg';
import VideoTabWhite from '@/assets/icons/main-page/tabs/video-white.svg';
import VideoTabBlack from '@/assets/icons/main-page/tabs/video-black.svg';
import ImageTabWhite from '@/assets/icons/main-page/tabs/image-white.svg';
import ImageTabBlack from '@/assets/icons/main-page/tabs/image-black.svg';
import ConvertTabWhite from '@/assets/icons/main-page/tabs/convert-white.svg';
import ConvertTabBlack from '@/assets/icons/main-page/tabs/convert-black.svg';
import AITabWhite from '@/assets/icons/main-page/tabs/ai-white.svg';
import AITabBlack from '@/assets/icons/main-page/tabs/ai-black.svg';

import { FeaturesList } from './FeaturesList/FeaturesList';

const tabIcons = {
  all: { white: AllTabWhite, black: AllTabBlack },
  pdf: { white: PDFTabWhite, black: PDFTabBlack },
  image: { white: ImageTabWhite, black: ImageTabBlack },
  write: { white: AITabWhite, black: AITabBlack },
  video: { white: VideoTabWhite, black: VideoTabBlack },
  file: { white: ConvertTabWhite, black: ConvertTabBlack },
};

type TabsTypes = keyof typeof tabIcons;

const features = {
  all: [...all],
  pdf: [...pdf],
  video: [...video],
  image: [...image],
  file: [...file],
  write: [...write],
};

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState<TabsTypes>('all');
  const t = useTranslations('main-page.tabs');
  return (
    <>
      <Typography variant={TypographyVariants.TITLE_2}>{t('title')}</Typography>
      <Typography variant={TypographyVariants.MAIN} className="mt-4">
        {t('description')}
      </Typography>

      <ul className="mt-4 flex gap-4 flex-wrap">
        {Object.keys(tabIcons).map((tab) => (
          <li key={tab}>
            <Tab
              title={t(tab)}
              IconBlack={tabIcons[tab as TabsTypes].black}
              IconWhite={tabIcons[tab as TabsTypes].white}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab as TabsTypes)}
            />
          </li>
        ))}
      </ul>
      <FeaturesList features={features[activeTab]} />
      {activeTab !== 'all' && (
      <div className="mt-6 flex justify-center">
        <LocaleLink href="/search"><Button variant={ButtonVariants.PRIMARY} width="153px">{t('all')}</Button></LocaleLink>
      </div>
      )}

    </>
  );
};
