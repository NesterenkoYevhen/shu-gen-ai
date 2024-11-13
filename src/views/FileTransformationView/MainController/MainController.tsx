'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { ProcessingFeature } from '@/features/ProcessingFeature';
import { usePathname } from 'next/navigation';
import { Steps } from '@/shared/types/common';
import toast from 'react-hot-toast';
import {
  compressImage, transformHEICtoJPG, transformPNGtoJPG, transformRAWtoJPG, transformTIFFtoJPG,
} from '@/shared/actions/image';
import { compressPDF, transformDOCXtoPDF, transformPDFtoDOCX } from '@/shared/actions/pdf';
import {
  compressVideo, transformMKVtoMP4, transformMP4toGIF, transformMP4toMP3,
} from '@/shared/actions/video';
import {
  transformJSONtoCSV, transformJSONtoXML, transformXLStoCSV, transformXLStoJSON, transformXLStoXML, transformXMLtoCSV, transformXMLtoJSON,
} from '@/shared/actions/file';
import { Step1 } from '../Step1';
import { Step2 } from '../Step2';
import { Step3 } from '../Step3';

interface IMainController {
  featureType: string;
  allowedExtensions: string[];
}

const fileProcessors: Record<string, (formData: FormData, locale: string) => Promise<{ file: string }>> = {
  'image.png-to-jpg': transformPNGtoJPG,
  'image.compress': compressImage,
  'image.heic-to-jpg': transformHEICtoJPG,
  'image.raw-to-jpg': transformRAWtoJPG,
  'image.tiff-to-jpg': transformTIFFtoJPG,
  'pdf.compress': compressPDF,
  'pdf.docx-to-pdf': transformDOCXtoPDF,
  'pdf.pdf-to-docx': transformPDFtoDOCX,
  'video.compress': compressVideo,
  'video.mkv-to-mp4': transformMKVtoMP4,
  'video.mp4-to-mp3': transformMP4toMP3,
  'video.video-to-gif': transformMP4toGIF,
  'file.json-to-csv': transformJSONtoCSV,
  'file.json-to-xml': transformJSONtoXML,
  'file.xls-to-csv': transformXLStoCSV,
  'file.xls-to-json': transformXLStoJSON,
  'file.xls-to-xml': transformXLStoXML,
  'file.xml-to-csv': transformXMLtoCSV,
  'file.xml-to-json': transformXMLtoJSON,
};

export const MainController: FC<IMainController> = ({ featureType, allowedExtensions }) => {
  const t = useTranslations('features-pages');
  const [file, setFile] = useState<File | null>(null);
  const [resultFileURL, setResultFileURL] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [step, setStep] = useState(1);

  const pathLocale = usePathname().split('/')[1] || 'en';

  const handleDrop = (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const newFormData = new FormData();
      newFormData.append('file', uploadedFile);
      setFormData(newFormData);
      setStep(2);
    }
  };

  const resetState = () => {
    setFile(null);
    setFormData(null);
    setStep(1);
  };

  const processFile = async () => {
    if (formData) {
      setStep(0);
      const processFunction = fileProcessors[featureType];
      if (processFunction) {
        try {
          const result = await processFunction(formData, pathLocale);
          setResultFileURL(result.file);
          setStep(3);
        } catch {
          toast.error('Error processing file');
          resetState();
        }
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: allowedExtensions.length > 0
      ? allowedExtensions.reduce(
        (acc, ext) => ({ ...acc, [ext.startsWith('.') ? `*${ext}` : ext]: [] }),
        {},
      )
      : undefined,
  });

  const renderSteps = (): Steps => ({
    0: <ProcessingFeature />,
    1: <Step1 {...getRootProps()} getInputProps={getInputProps} isDragActive={isDragActive} />,
    2: file && <Step2 file={file} onProcess={processFile} />,
    3: file && <Step3 file={file} transformedFile={resultFileURL || ''} />,
  });

  return (
    <div className="w-full mt-10">
      {step > 1 && (
        <Button variant={ButtonVariants.SECONDARY} onClick={resetState} width="194px" className="mb-5">
          {t('reset')}
        </Button>
      )}
      <div className="w-full flex justify-center">
        {renderSteps()[step]}
      </div>
    </div>
  );
};
