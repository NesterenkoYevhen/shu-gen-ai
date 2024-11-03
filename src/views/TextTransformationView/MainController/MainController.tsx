'use client';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { Textarea } from '@/shared/ui-kit/Textarea';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { downloadFile } from '@/utils/downloadFile';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { FC, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineContentCopy } from 'react-icons/md';

const CustomEditor = dynamic(() => import('../Editor/Editor'), { ssr: false });

interface IMainController {
  featureType: string;
}

const MOCKED_FILE = 'https://s2.q4cdn.com/175719177/files/doc_presentations/Placeholder-PDF.pdf';

export const MainController: FC<IMainController> = ({ featureType }) => {
  const t = useTranslations();
  const [aiResponse, setAIResponse] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [pendingButton, setPendingButton] = useState<'generate' | 'rewrite' | null>(null); // Зберігає, яка кнопка активна під час запиту
  const editorRef = useRef<any>(null);

  const handleCopyToClipboard = () => {
    if (editorRef.current) {
      const editorContentHTML = editorRef.current.getData();

      const tempElement = document.createElement('div');
      tempElement.innerHTML = editorContentHTML;

      const plainText = tempElement.innerText || tempElement.textContent || '';

      navigator.clipboard.writeText(plainText).then(() => {
        toast.success(t('features-pages.copy-success'));
      }).catch(() => {
        toast.error(t('features-pages.copy-fail'));
      });
    }
  };

  const handleSubmit = async (formData: FormData, buttonType: 'generate' | 'rewrite') => {
    const inputText = formData.get('input') as string;

    if (!inputText || inputText.trim().length === 0) {
      toast.error(t('features-pages.input-required'));
      return;
    }

    setIsPending(true);
    setPendingButton(buttonType);

    try {
      // Логіка для обробки введеного тексту (згенерувати відповідь AI, якщо потрібно)
      // Наприклад:
      // const response = await someAIProcessingFunction(inputText);
      setAIResponse(inputText);

      toast.success(t('features-pages.submit-success'));
    } catch (error) {
      toast.error(t('features-pages.submit-fail'));
    } finally {
      setIsPending(false);
      setPendingButton(null);
    }
  };

  console.log();

  return (
    <div className="mt-16">
      <form className="flex justify-between flex-wrap tablet:flex-nowrap">
        <div className="rounded-3xl p-6 border border-solid border-neutralsGrey300-light dark:border-neutralsGrey300-dark w-full tablet:w-[32%] flex flex-col justify-between">
          <div>
            <Typography variant={TypographyVariants.TITLE_3}>{t(`features.write.${featureType}.action`)}</Typography>
            <Typography variant={TypographyVariants.MAIN} className="mt-2 text-neutralsGrey600-light dark:text-neutralsGrey600-dark">{t(`features.write.${featureType}.action-description`)}</Typography>
            <Textarea className="mt-4" name="input" height="350px" maxLength={1000} />
          </div>

          <div className="flex justify-between">
            <Button
              variant={ButtonVariants.PRIMARY}
              width="100%"
              type="submit"
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(new FormData(e.currentTarget.closest('form')!), 'generate');
              }}
            >
              {isPending && pendingButton === 'generate' ? t('features-pages.generate-pending') : t('features-pages.generate')}
            </Button>

          </div>
        </div>

        <div className="rounded-3xl p-6 border border-solid border-neutralsGrey300-light dark:border-neutralsGrey300-dark w-full tablet:w-[65%] flex flex-col justify-between">
          <div>
            <Typography variant={TypographyVariants.TITLE_3}>{t('features-pages.ai-output')}</Typography>
            <Typography variant={TypographyVariants.MAIN} className="mt-2 mb-4 text-neutralsGrey600-light dark:text-neutralsGrey600-dark">{t('features-pages.write-description')}</Typography>

            <CustomEditor editorRef={editorRef} data={aiResponse} />
          </div>

          <div className="mt-4 tablet:mt-0 flex justify-center tablet:justify-between items-center gap-4 tablet:gap-0 flex-wrap tablet:flex-nowrap">
            <Button
              variant={ButtonVariants.PRIMARY}
              width="100%"
              className="!w-full tablet:!w-[200px]"
              type="submit"
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(new FormData(e.currentTarget.closest('form')!), 'rewrite');
              }}
            >
              {isPending && pendingButton === 'rewrite' ? t('features-pages.rewrite-pending') : t('features-pages.rewrite')}
            </Button>
            <Button variant={ButtonVariants.PRIMARY} width="100%" className="!w-full tablet:!w-[200px]" type="button" onClick={() => downloadFile(MOCKED_FILE, 'output')}>{t('features-pages.download')}</Button>
            <button
              className="flex justify-center items-center w-[48px] h-[48px] rounded-full bg-primaryGreen-light dark:bg-primaryGreen-dark"
              type="button"
              onClick={handleCopyToClipboard}
            >
              <MdOutlineContentCopy className="text-2xl" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
