/* eslint-disable consistent-return */

'use client';

import { FC, useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { ProcessingFeature } from '@/features/ProcessingFeature';
import { Step1 } from '../Step1';
import { Step2 } from '../Step2';
import { Step3 } from '../Step3';

interface Steps {
  [key: number]: JSX.Element | null;
}

interface IMainController {
  featureType: string;
  allowedExtensions: string[];
}

const MOCKED_IMAGE = 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/22606/images/a06d8c1-cd85-8a65-e2de-c75185ad4f4_object-recognition-e1541510005103.png';

export const MainController: FC<IMainController> = ({ featureType, allowedExtensions }) => {
  const t = useTranslations('features-pages');
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [step, setStep] = useState(1);
  const [nextStep, setNextStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  console.log(featureType, formData);

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

  const onDrop = (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);

      const newFormData = new FormData();
      newFormData.append('file', uploadedFile);
      setFormData(newFormData);

      changeStepWithTransition(2);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedExtensions.length
      ? allowedExtensions.reduce((acc, ext) => {
        acc[ext.startsWith('.') ? `*${ext}` : ext] = [];
        return acc;
      }, {} as Record<string, string[]>)
      : { '*/*': [] },
  });

  const resetState = () => {
    setFile(null);
    setFormData(null);
    changeStepWithTransition(1);
  };

  const steps:Steps = {
    0: <ProcessingFeature />,
    1: <Step1 {...getRootProps()} getInputProps={getInputProps} isDragActive={isDragActive} />,
    2: file && <Step2 file={file} onProcess={() => changeStepWithTransition(3)} />,
    3: file && <Step3 file={file} transformedFile={MOCKED_IMAGE} />,
  };

  return (
    <div className="w-full mt-10">
      {step > 1 && (
        <Button variant={ButtonVariants.SECONDARY} onClick={resetState} width="194px" className="mb-5">
          {t('reset')}
        </Button>
      )}
      <div className="w-full flex justify-center">
        {steps[step]}
      </div>
    </div>
  );
};
