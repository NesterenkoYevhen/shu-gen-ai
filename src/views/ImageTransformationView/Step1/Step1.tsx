import { FC } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { useScreenSize } from '@/shared/hooks/useScreenSize';

import { backgrounds } from '@/shared/constants/backgrounds';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { Tab } from '@/shared/ui-kit/Tab';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

interface IStep1 {
  imageWidth: number;
  imageHeight: number;
  imageURL: string;
  changeStep: (value: number) => void;
  featureType: string;
  selectedBackground: number;
  setSelectedBackground: React.Dispatch<React.SetStateAction<number>>;
}

export const Step1: FC<IStep1> = ({
  imageWidth, imageHeight, imageURL, changeStep, featureType, selectedBackground, setSelectedBackground,
}) => {
  const t = useTranslations();
  const isSm769 = useScreenSize('769');
  const isSm450 = useScreenSize('450');

  const checkHeight = () => {
    if (isSm450) {
      return '200px';
    }

    if (isSm769) {
      return '400px';
    }

    return '600px';
  };
  return (
    <div className="flex justify-between mt-5 flex-wrap gap-4 3xl:gap-0">
      <div
        className="relative mx-auto"
        style={{
          width: imageWidth && imageHeight ? `calc(${checkHeight()} * ${imageWidth / imageHeight})` : 'auto',
          height: checkHeight(),
        }}
      >
        <Image src={imageURL} alt="Uploaded" className="object-cover" fill />
      </div>
      { featureType === 'edit-the-background' ? (
        <div className="max-w-full 3xl:max-w-[25%] flex flex-col justify-between w-full items-center gap-3">
          <Typography variant={TypographyVariants.TITLE_2}>{t(`features.image.${featureType}.action-description`)}</Typography>
          <ul className="mt-4 flex gap-4 flex-wrap">
            {backgrounds.map((background) => (
              <li key={background.id}>
                <Tab
                  title={t(background.label)}
                  IconBlack={background.Icon}
                  IconWhite={background.Icon}
                  active={selectedBackground === background.id}
                  onClick={() => setSelectedBackground(background.id)}
                />
              </li>
            ))}
          </ul>
          <Button variant={ButtonVariants.PRIMARY} width="250px" onClick={() => changeStep(2)}>{t(`features.image.${featureType}.action`)}</Button>
        </div>
      ) : (
        <div className="max-w-full 3xl:max-w-[25%] flex flex-col justify-end w-full items-center">
          <Button variant={ButtonVariants.PRIMARY} width="250px" onClick={() => changeStep(2)}>{t('features-pages.process')}</Button>
        </div>
      )}
    </div>
  );
};
