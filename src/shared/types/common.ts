import { StaticImageData } from 'next/image';

import { IconType } from 'react-icons';

import { PathnamesType } from '@/features/LocaleNavigation';
import { ReactNode } from 'react';

export type Svg = React.VFC<React.SVGProps<SVGSVGElement>>;

export type ImageType = string | StaticImageData | null;

export interface Feature {
  id: number;
  label: string;
  Icon: IconType;
  route: PathnamesType;
  Image?: StaticImageData;
}

type Plan = 'FREE' | 'PRO' | 'PRO+';

export interface Tarrif {
  id: Plan;
  label: string;
  price: string;
}

export interface DropdownList {
  value:string;
  label:string | ReactNode;
  className?:string;
}

export interface Background {
  id: number;
  label: string;
  Icon: IconType;
}
