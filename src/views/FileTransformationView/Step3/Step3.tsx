import { FC } from 'react';

import { useTranslations } from 'next-intl';

import { downloadFile } from '@/utils/downloadFile';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

interface IStep3Props {
  file: File;
  transformedFile: string;
}

export const Step3: FC<IStep3Props> = ({ file, transformedFile }) => {
  const t = useTranslations('features-pages');
  return (
    <div className="w-[833px] h-[393px] rounded-[40px] flex flex-col items-center justify-center bg-additionalGrey200-light dark:bg-additionalGrey200-dark p-6">
      <Typography variant={TypographyVariants.TITLE_3}>
        {file.name}
        {' '}
        -
        {' '}
        {t('result')}
      </Typography>
      <Button variant={ButtonVariants.PRIMARY} width="250px" onClick={() => downloadFile(transformedFile, file.name)} className="mt-4">
        {t('download')}
      </Button>
    </div>
  );
};
