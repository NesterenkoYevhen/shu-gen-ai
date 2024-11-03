import { FC } from 'react';

import { useTranslations } from 'next-intl';

import UploadIcon from '@/assets/icons/features/upload-icon.svg';
import CloudIcon from '@/assets/icons/features/cloud-icon.svg';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

interface IStep1Props {
  getInputProps: () => any;
  isDragActive: boolean;
}

export const Step1: FC<IStep1Props> = ({ getInputProps, isDragActive, ...rootProps }) => {
  const t = useTranslations('features-pages');
  return (
    <div {...rootProps} className={`w-[833px] h-[393px] rounded-[40px] flex flex-col items-center justify-center ${isDragActive ? 'bg-blue-100' : 'bg-additionalGrey200-light dark:bg-additionalGrey200-dark'}`}>
      <input {...getInputProps()} />
      <div className="flex flex-col gap-4 justify-center items-center">
        <Button StartIcon={UploadIcon} variant={ButtonVariants.PRIMARY} width="276px">
          {t('upload-long')}
        </Button>
        <Typography variant={TypographyVariants.TITLE_5} className="text-secondaryGreen-light dark:text-secondaryGreen-dark">
          {t('drag-option')}
        </Typography>
        <CloudIcon />
      </div>
    </div>
  );
};
