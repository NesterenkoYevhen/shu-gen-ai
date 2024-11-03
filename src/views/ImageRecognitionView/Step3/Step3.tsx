import { FC } from 'react';
import Image from 'next/image';
import { ImgComparisonSlider } from '@img-comparison-slider/react';

import { useTranslations } from 'next-intl';

import { useScreenSize } from '@/shared/hooks/useScreenSize';

import { downloadFile } from '@/utils/downloadFile';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';

interface IStep3 {
  imageWidth: number;
  imageHeight: number;
  startImageURL: string;
  resultImageURL: string;
}

export const Step3: FC<IStep3> = ({
  imageWidth, imageHeight, startImageURL, resultImageURL,
}) => {
  const t = useTranslations('features-pages');
  const isSm769 = useScreenSize('769');
  const isSm450 = useScreenSize('450');

  const checkHeight = () => {
    if (isSm450) return '200px';
    if (isSm769) return '400px';
    return '600px';
  };

  const computedWidth = imageWidth && imageHeight
    ? `calc(${checkHeight()} * ${imageWidth / imageHeight})`
    : '100%';

  return (
    <div className="flex justify-between mt-5 flex-wrap gap-4 3xl:gap-0">
      <div
        className="relative mx-auto checkerboard-background"
        style={{
          width: computedWidth,
          height: checkHeight(),
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <ImgComparisonSlider
          direction={isSm450 ? 'vertical' : 'horizontal'}
          className="slider-split-custom-line"
          style={{
            width: computedWidth,
            height: checkHeight(),
            maxWidth: '100%',
            overflow: 'hidden',
          }}
        >
          <figure slot="first" className="before">
            <div
              className="relative"
              style={{
                width: '100%',
                height: checkHeight(),
              }}
            >
              <Image src={startImageURL} alt="Uploaded1" className="object-cover" fill />
            </div>
            <figcaption>{t('before')}</figcaption>
          </figure>
          <figure slot="second" className="after">
            <div
              className="relative"
              style={{
                width: '100%',
                height: checkHeight(),
              }}
            >
              <Image src={resultImageURL} alt="Uploaded2" className="object-cover" fill />
            </div>
            <figcaption>{t('after')}</figcaption>
          </figure>
          <svg slot="handle" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...({ slot: 'handle' } as any)}>
            <rect width="32" height="32" rx="16" fill="white" />
            <path d="M12.9466 8.38659C12.8226 8.26161 12.6752 8.16242 12.5127 8.09473C12.3502 8.02704 12.1759 7.99219 11.9999 7.99219C11.8239 7.99219 11.6496 8.02704 11.4871 8.09473C11.3247 8.16242 11.1772 8.26161 11.0533 8.38659L4.38659 15.0533C4.26161 15.1772 4.16242 15.3247 4.09473 15.4871C4.02704 15.6496 3.99219 15.8239 3.99219 15.9999C3.99219 16.1759 4.02704 16.3502 4.09473 16.5127C4.16242 16.6752 4.26161 16.8226 4.38659 16.9466L11.0533 23.6133C11.1772 23.7382 11.3247 23.8374 11.4871 23.9051C11.6496 23.9728 11.8239 24.0077 11.9999 24.0077C12.1759 24.0077 12.3502 23.9728 12.5127 23.9051C12.6752 23.8374 12.8226 23.7382 12.9466 23.6133C13.0716 23.4893 13.1707 23.3418 13.2384 23.1794C13.3061 23.0169 13.341 22.8426 13.341 22.6666C13.341 22.4906 13.3061 22.3163 13.2384 22.1538C13.1707 21.9913 13.0716 21.8439 12.9466 21.7199L7.21325 15.9999L12.9466 10.2799C13.0716 10.156 13.1707 10.0085 13.2384 9.84602C13.3061 9.68354 13.341 9.50927 13.341 9.33325C13.341 9.15724 13.3061 8.98296 13.2384 8.82048C13.1707 8.658 13.0716 8.51054 12.9466 8.38659ZM27.6133 15.0533L20.9466 8.38659C20.8223 8.26227 20.6747 8.16365 20.5123 8.09637C20.3498 8.02909 20.1757 7.99446 19.9999 7.99446C19.6448 7.99446 19.3043 8.13551 19.0533 8.38659C18.9289 8.5109 18.8303 8.65849 18.763 8.82092C18.6958 8.98335 18.6611 9.15744 18.6611 9.33325C18.6611 9.68832 18.8022 10.0288 19.0533 10.2799L24.7866 15.9999L19.0533 21.7199C18.9283 21.8439 18.8291 21.9913 18.7614 22.1538C18.6937 22.3163 18.6589 22.4906 18.6589 22.6666C18.6589 22.8426 18.6937 23.0169 18.7614 23.1794C18.8291 23.3418 18.9283 23.4893 19.0533 23.6133C19.1772 23.7382 19.3247 23.8374 19.4872 23.9051C19.6496 23.9728 19.8239 24.0077 19.9999 24.0077C20.1759 24.0077 20.3502 23.9728 20.5127 23.9051C20.6752 23.8374 20.8226 23.7382 20.9466 23.6133L27.6133 16.9466C27.7382 16.8226 27.8374 16.6752 27.9051 16.5127C27.9728 16.3502 28.0077 16.1759 28.0077 15.9999C28.0077 15.8239 27.9728 15.6496 27.9051 15.4871C27.8374 15.3247 27.7382 15.1772 27.6133 15.0533Z" fill="#8E8F96" />
          </svg>
        </ImgComparisonSlider>
      </div>

      <div className="max-w-full 3xl:max-w-[25%] flex flex-col justify-between w-full items-center gap-3">
        <Button variant={ButtonVariants.PRIMARY} width="250px" onClick={() => downloadFile(resultImageURL)}>{t('download')}</Button>
      </div>
    </div>
  );
};
