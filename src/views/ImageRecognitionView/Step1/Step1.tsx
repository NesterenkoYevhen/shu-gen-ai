import { FC } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { useScreenSize } from '@/shared/hooks/useScreenSize';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';

interface IStep1 {
  imageWidth: number;
  imageHeight: number;
  imageURL: string;
  changeStep: () => void;
}

export const Step1: FC<IStep1> = ({
  imageWidth, imageHeight, imageURL, changeStep,
}) => {
  const t = useTranslations('features-pages');
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
      <div className="max-w-full 3xl:max-w-[25%] flex flex-col justify-end w-full items-center">
        <Button variant={ButtonVariants.PRIMARY} width="250px" onClick={() => changeStep()}>{t('process')}</Button>
      </div>
    </div>
  );
};
