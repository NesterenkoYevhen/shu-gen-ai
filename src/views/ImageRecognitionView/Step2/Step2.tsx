import { FC } from 'react';
import Image from 'next/image';
import { FaCircleNodes } from 'react-icons/fa6';

import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { useTranslations } from 'next-intl';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { Tab } from '@/shared/ui-kit/Tab';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

interface IStep2 {
  imageWidth: number;
  imageHeight: number;
  imageURL: string;
  changeStep: (value: number) => void;
  objects: string[];
  selectedObjects: string[];
  setSelectedObjects: React.Dispatch<React.SetStateAction<string[]>>;
  featureType: string;
}

export const Step2: FC<IStep2> = ({
  imageWidth, imageHeight, imageURL, changeStep, objects, selectedObjects, setSelectedObjects, featureType,
}) => {
  const t = useTranslations(`features.image.${featureType}`);
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

  const toggleTab = (tabId: string) => {
    setSelectedObjects((prev) => (prev.includes(tabId) ? prev.filter((obj) => obj !== tabId) : [...prev, tabId]));
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
      <div className="max-w-full 3xl:max-w-[25%] flex flex-col justify-between w-full items-center gap-3">
        <Typography variant={TypographyVariants.TITLE_2}>{t('action-description')}</Typography>
        <ul className="mt-4 flex gap-4 flex-wrap">
          {objects.map((object) => (
            <li key={object}>
              <Tab
                title={object}
                IconBlack={FaCircleNodes}
                IconWhite={FaCircleNodes}
                active={selectedObjects.some((obj) => obj === object)}
                onClick={() => toggleTab(object)}
              />
            </li>
          ))}
        </ul>
        <Button variant={ButtonVariants.PRIMARY} width="250px" onClick={() => changeStep(3)} disabled={selectedObjects.length === 0}>{t('action')}</Button>
      </div>
    </div>
  );
};
