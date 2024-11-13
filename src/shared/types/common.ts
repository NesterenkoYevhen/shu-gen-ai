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
  api_key: string;
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

export interface StatisticsResponse {
  user_count: number;
  text_feature_count: number;
  image_feature_count: number;
  file_feature_count: number;
  total_feature_count: number;
}

export interface UserResponse {
  email: string;
  is_verified: boolean;
  first_name: string;
  last_name: string;
  nickname: string;
  is_staff: boolean;
  phone_number: string;
}

export interface SessionType {
  accessToken: string | null;
  user: UserResponse | null;
}

export interface CreditCard {
  id: number;
  card_number: string;
  card_type: 'Visa' | 'MasterCard',
  expiration_date: string;
  added_on: string;
}

export type PlanAPIType = 'trial' | 'advanced' | 'pro';

type PlanType = 'FREE' | 'PRO' | 'PRO+';

export interface Tarrif {
  id: PlanType;
  label: string;
  price: string;
  duration: number;
  api_label: PlanAPIType;
  api_id: number;
}

export interface SubscriptionResponse {
  id: number;
  user: number;
  plan: number;
  start_date: string;
  end_date: string;
}

export interface Subscription {
  id: PlanType;
  label: string;
  price: string;
  duration: number;
  api_label: PlanAPIType;
  start_date: string;
  end_date: string;
}

export interface FeatureImageRecognitionResponse {
  segmented_image_url: string;
  objects: string[];
}

export interface FeatureFileResponse {
  id: number;
  user: number;
  date: string;
  feature: {
    id: number;
    key: string,
    used_count: number;
  },
  file: string;
}

export interface Steps {
  [key: number]: JSX.Element | null;
}

export interface FeatureTextResponse {
  id: number;
  user: number;
  date: string;
  feature: {
    id: number;
    key: string,
    used_count: number;
  },
  file: string;
  text: string;
}

export interface RecentTool {
  key: string;
}
