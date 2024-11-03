/* eslint-disable consistent-return */

'use client';

import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import { useTranslations } from 'next-intl';

import UploadIcon from '@/assets/icons/features/upload-icon.svg';
import CloudIcon from '@/assets/icons/features/cloud-icon.svg';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { ProcessingFeature } from '@/features/ProcessingFeature';
import { Step1 } from '../Step1';
import { Step2 } from '../Step2';
import { Step3 } from '../Step3';

const MOCKED_RECOGNIZED_IMAGE = 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/22606/images/a06d8c1-cd85-8a65-e2de-c75185ad4f4_object-recognition-e1541510005103.png';
const MOCKED_RESULT_IMAGE = 'https://support.rebrandly.com/hc/article_attachments/360020801813';

const MOCKED_OBJECTS = [
  { id: 'q', name: 'person' },
  { id: 'w', name: 'bicycle' },
  { id: 'e', name: 'motorcycle' },
  { id: 'r', name: 'airplane' },
  { id: 't', name: 'bus' },
  { id: 'y', name: 'train' },
  { id: 'i', name: 'truck' },
  { id: 'o', name: 'boat' },
  { id: 'p', name: 'traffic light' },
  { id: 'a', name: 'fire hydrant' },
  { id: 's', name: 'stop sign' },
];

export interface ObjectItem {
  id: string;
  name: string;
}

interface Steps {
  [key: number]: JSX.Element;
}

interface IMainController {
  featureType: string;
}

export const MainController:FC<IMainController> = ({ featureType }) => {
  const t = useTranslations('features-pages');
  const [images, setImages] = useState<ImageListType>([]);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [imageFormData, setImageFormData] = useState<FormData | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<ObjectItem[]>([]);
  const [step, setStep] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  console.log(imageFormData);

  useEffect(() => {
    if (isTransitioning) {
      setStep(0);
      const timer = setTimeout(() => {
        setStep(nextStep);
        setIsTransitioning(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, nextStep]);

  const changeStepWithTransition = (newStep: number) => {
    setNextStep(newStep);
    setIsTransitioning(true);
  };

  const resetImageState = () => {
    setImages([]);
    setImageURL(null);
    setImageFormData(null);
    setImageDimensions(null);
    setSelectedObjects([]);
    setStep(0);
    setNextStep(0);
    setIsTransitioning(false);
  };

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);

    if (imageList.length > 0) {
      const { dataURL, file } = imageList[0];
      setImageURL(dataURL || null);

      if (file) {
        const formData = new FormData();
        formData.append('upload', file);
        setImageFormData(formData);
      }

      const img = new window.Image();
      img.src = dataURL || '';
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
      changeStepWithTransition(1);
    } else {
      resetImageState();
    }
  };

  const steps: Steps = {
    0: <ProcessingFeature />,
    1: <Step1 imageWidth={imageDimensions?.width || 0} imageHeight={imageDimensions?.height || 0} imageURL={imageURL || ''} changeStep={changeStepWithTransition} />,
    2: <Step2 imageWidth={imageDimensions?.width || 0} imageHeight={imageDimensions?.height || 0} imageURL={MOCKED_RECOGNIZED_IMAGE} changeStep={changeStepWithTransition} objects={MOCKED_OBJECTS} selectedObjects={selectedObjects} setSelectedObjects={setSelectedObjects} featureType={featureType} />,
    3: <Step3 imageWidth={imageDimensions?.width || 0} imageHeight={imageDimensions?.height || 0} startImageURL={imageURL || ''} resultImageURL={MOCKED_RESULT_IMAGE} />,
  };

  return (
    <div>
      {imageURL ? (
        <div className="mt-10">
          {step !== 0 && (
            <Button
              variant={ButtonVariants.SECONDARY}
              onClick={resetImageState}
              width="194px"
            >
              {t('reset')}
            </Button>
          )}
          {steps[step]}
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <ImageUploading value={images} onChange={onChange} dataURLKey="dataURL">
            {({ onImageUpload, dragProps, isDragging }) => (
              <div
                className={cn(
                  'mt-10 w-[833px] h-[393px] rounded-[40px] flex justify-center items-center transition-all',
                  {
                    'bg-additionalGrey200-light dark:bg-additionalGrey200-dark border-4 border-transparent': !isDragging,
                    'bg-blue-100 dark:bg-blue-900 border-dashed border-4 border-blue-500': isDragging,
                  },
                )}
                {...dragProps}
              >
                <div className="flex flex-col gap-4 justify-center items-center">
                  <Button StartIcon={UploadIcon} variant={ButtonVariants.PRIMARY} width="276px" onClick={onImageUpload}>
                    {t('upload-long')}
                  </Button>
                  <Typography variant={TypographyVariants.TITLE_5} className="text-secondaryGreen-light dark:text-secondaryGreen-dark">
                    {t('drag-option')}
                  </Typography>
                  <CloudIcon />
                </div>
              </div>
            )}
          </ImageUploading>
        </div>
      )}
    </div>
  );
};
