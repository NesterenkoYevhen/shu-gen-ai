/* eslint-disable consistent-return */

'use client';

import {
  FC, useCallback, useState,
} from 'react';
import cn from 'classnames';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import { useTranslations } from 'next-intl';

import UploadIcon from '@/assets/icons/features/upload-icon.svg';
import CloudIcon from '@/assets/icons/features/cloud-icon.svg';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { ProcessingFeature } from '@/features/ProcessingFeature';
import { cutOutObjectImage, pickUpObjectImage } from '@/shared/actions/image';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { Steps } from '@/shared/types/common';
import { Step1 } from '../Step1';
import { Step2 } from '../Step2';
import { Step3 } from '../Step3';

const recognitionProcessors: Record<string, (formData: FormData, locale: string, requestType: 'recognition' | 'processing') => Promise<{ file?: string; segmented_image_url?: string; objects?: string[] }>> = {
  'pick-up-an-object': pickUpObjectImage,
  'cut-out-an-object': cutOutObjectImage,
};
interface IMainController {
  featureType: string;
}

export const MainController:FC<IMainController> = ({ featureType }) => {
  const t = useTranslations('features-pages');
  const [images, setImages] = useState<ImageListType>([]);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [recognisedImageURL, setRecognisedImageURL] = useState<string | null>(null);
  const [resultImageURL, setResultImageURL] = useState<string | null>(null);
  const [imageFormData, setImageFormData] = useState<FormData | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [recognisedObjects, setRecognisedObjects] = useState<string[]>([]);
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const pathname = usePathname();
  const pathLocale = pathname.split('/')[1] || 'en';

  const resetImageState = useCallback(() => {
    setImages([]);
    setImageURL(null);
    setImageFormData(null);
    setImageDimensions(null);
    setSelectedObjects([]);
    setStep(1);
  }, []);

  const processImage = async (requestType: 'recognition' | 'processing') => {
    if (imageFormData) {
      setStep(0);
      const processFunction = recognitionProcessors[featureType];
      if (requestType === 'processing') {
        imageFormData.append('objects', selectedObjects.join(','));
      }
      if (processFunction) {
        try {
          const result = await processFunction(imageFormData, pathLocale, requestType);

          if (requestType === 'recognition') {
            setRecognisedImageURL(result?.segmented_image_url || '');
            setRecognisedObjects(result?.objects || []);
            setStep(2);
          } else {
            setResultImageURL(result?.file || '');
            setStep(3);
          }
        } catch {
          toast.error(t('Error'));
          resetImageState();
        }
      }
    }
  };

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
    if (imageList.length > 0) {
      const { dataURL, file } = imageList[0];
      setImageURL(dataURL || null);
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        setImageFormData(formData);
      }

      const img = new window.Image();
      img.src = dataURL || '';
      img.onload = () => setImageDimensions({ width: img.width, height: img.height });
      setStep(1);
    } else {
      resetImageState();
    }
  };

  const steps: Steps = {
    0: <ProcessingFeature />,
    1: <Step1 imageWidth={imageDimensions?.width || 0} imageHeight={imageDimensions?.height || 0} imageURL={imageURL || ''} changeStep={() => processImage('recognition')} />,
    2: <Step2 imageWidth={imageDimensions?.width || 0} imageHeight={imageDimensions?.height || 0} imageURL={recognisedImageURL || ''} changeStep={() => processImage('processing')} objects={recognisedObjects} selectedObjects={selectedObjects} setSelectedObjects={setSelectedObjects} featureType={featureType} />,
    3: <Step3 imageWidth={imageDimensions?.width || 0} imageHeight={imageDimensions?.height || 0} startImageURL={imageURL || ''} resultImageURL={resultImageURL || ''} />,
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
