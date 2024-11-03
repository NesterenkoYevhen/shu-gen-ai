import { FC } from 'react';

import { useTranslations } from 'next-intl';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

interface IStep2Props {
  file: File;
  onProcess: () => void;
}

export const Step2: FC<IStep2Props> = ({ file, onProcess }) => {
  const t = useTranslations('features-pages');
  return (
    <div className="w-[833px] h-[393px] rounded-[40px] flex flex-col gap-3 items-center justify-center bg-additionalGrey200-light dark:bg-additionalGrey200-dark p-6">
      <Typography variant={TypographyVariants.TITLE_3}>{file.name}</Typography>
      <Typography variant={TypographyVariants.MAIN}>
        {t('size')}
        :
        {' '}
        {(file.size / 1024).toFixed(2)}
        {' '}
        KB
      </Typography>
      <Typography variant={TypographyVariants.MAIN}>
        {t('type')}
        :
        {' '}
        {file.type}
      </Typography>
      <Button variant={ButtonVariants.PRIMARY} width="250px" onClick={onProcess} className="mt-4">
        {t('process')}
      </Button>
    </div>
  );
};
