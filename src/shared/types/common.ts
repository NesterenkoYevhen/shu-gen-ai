import { StaticImageData } from 'next/image';

import { IconType } from 'react-icons';

import { PathnamesType } from '@/features/LocaleNavigation';

export type Svg = React.VFC<React.SVGProps<SVGSVGElement>>;

export type ImageType = string | StaticImageData | null;

export interface Feature {
  id: number;
  label: string;
  Icon: IconType;
  route: PathnamesType;
  Image?: StaticImageData;
}
