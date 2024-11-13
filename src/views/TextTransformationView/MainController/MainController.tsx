'use client';

import {
  createCodeDocumentation, createEssay, createParagraph, createPost, createSummary, makeGrammarCheck,
  rewriteText,
} from '@/shared/actions/write';
import { FeatureTextResponse } from '@/shared/types/common';
import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { Textarea } from '@/shared/ui-kit/Textarea';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { downloadFile } from '@/utils/downloadFile';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import {
  FC, useRef, useState, FormEvent,
} from 'react';
import toast from 'react-hot-toast';
import { MdOutlineContentCopy } from 'react-icons/md';

const CustomEditor = dynamic(() => import('../Editor/Editor'), { ssr: false });

interface IMainController {
  featureType: string;
}

const textProcessors: Record<string, (text: FormData, locale: string) => Promise<FeatureTextResponse>> = {
  'code-documentation': createCodeDocumentation,
  essay: createEssay,
  'grammar-checker': makeGrammarCheck,
  paragraph: createParagraph,
  post: createPost,
  rewriter: rewriteText,
  summary: createSummary,
};

export const MainController: FC<IMainController> = ({ featureType }) => {
  const t = useTranslations();
  const [aiResponse, setAIResponse] = useState('');
  const [generatedFile, setGeneratedFile] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [pendingButton, setPendingButton] = useState<'generate' | 'rewrite' | null>(null);
  const editorRef = useRef<any>(null);
  const pathLocale = usePathname().split('/')[1] || 'en';

  const handleCopyToClipboard = () => {
    if (!editorRef.current) return;

    const editorContentHTML = editorRef.current.getData();
    const plainText = new DOMParser().parseFromString(editorContentHTML, 'text/html').body.textContent || '';

    navigator.clipboard.writeText(plainText)
      .then(() => toast.success(t('features-pages.copy-success')))
      .catch(() => toast.error(t('features-pages.copy-fail')));
  };

  const handleSubmit = async (formData: FormData, buttonType: 'generate' | 'rewrite') => {
    const inputText = formData.get('input') as string;
    if (!inputText?.trim()) {
      toast.error(t('features-pages.input-required'));
      return;
    }

    setIsPending(true);
    setPendingButton(buttonType);

    try {
      const processFunction = textProcessors[featureType];
      const newFormData = new FormData();
      newFormData.append('text', inputText);

      const result = await processFunction(newFormData, pathLocale);
      setAIResponse(result.text);
      setGeneratedFile(result.file);
      toast.success(t('features-pages.submit-success'));
    } catch {
      toast.error(t('features-pages.submit-fail'));
    } finally {
      setIsPending(false);
      setPendingButton(null);
    }
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>, buttonType: 'generate' | 'rewrite') => {
    e.preventDefault();
    handleSubmit(new FormData(e.currentTarget), buttonType);
  };

  return (
    <div className="mt-16">
      <form className="flex justify-between flex-wrap tablet:flex-nowrap" onSubmit={(e) => onSubmitHandler(e, 'generate')}>
        <div className="rounded-3xl p-6 border border-solid border-neutralsGrey300-light dark:border-neutralsGrey300-dark w-full tablet:w-[32%] flex flex-col justify-between">
          <div>
            <Typography variant={TypographyVariants.TITLE_3}>{t(`features.write.${featureType}.action`)}</Typography>
            <Typography variant={TypographyVariants.MAIN} className="mt-2 text-neutralsGrey600-light dark:text-neutralsGrey600-dark">
              {t(`features.write.${featureType}.action-description`)}
            </Typography>
            <Textarea className="mt-4" name="input" height="350px" maxLength={1000} />
          </div>

          <Button
            variant={ButtonVariants.PRIMARY}
            width="100%"
            type="submit"
            disabled={isPending}
          >
            {isPending && pendingButton === 'generate' ? t('features-pages.generate-pending') : t('features-pages.generate')}
          </Button>
        </div>

        <div className="rounded-3xl p-6 border border-solid border-neutralsGrey300-light dark:border-neutralsGrey300-dark w-full tablet:w-[65%] flex flex-col justify-between">
          <div>
            <Typography variant={TypographyVariants.TITLE_3}>{t('features-pages.ai-output')}</Typography>
            <Typography variant={TypographyVariants.MAIN} className="mt-2 mb-4 text-neutralsGrey600-light dark:text-neutralsGrey600-dark">
              {t('features-pages.write-description')}
            </Typography>
            <CustomEditor editorRef={editorRef} data={aiResponse} />
          </div>

          <div className="mt-4 tablet:mt-0 flex justify-center tablet:justify-between items-center gap-4 tablet:gap-0 flex-wrap tablet:flex-nowrap">
            <Button
              variant={ButtonVariants.PRIMARY}
              width="100%"
              className="!w-full tablet:!w-[200px]"
              type="button"
              disabled={isPending}
              onClick={(e) => onSubmitHandler(e as unknown as FormEvent<HTMLFormElement>, 'rewrite')}
            >
              {isPending && pendingButton === 'rewrite' ? t('features-pages.rewrite-pending') : t('features-pages.rewrite')}
            </Button>
            <Button variant={ButtonVariants.PRIMARY} width="100%" className="!w-full tablet:!w-[200px]" type="button" onClick={() => downloadFile(generatedFile, 'output')} disabled={!generatedFile}>
              {t('features-pages.download')}
            </Button>
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
