import { FC } from 'react';

import { Feature } from '@/shared/types/common';
import { FeatureItem } from '../FeatureItem/FeatureItem';

interface ExtendedFeature extends Feature {
  translatedLabel: string;
  translatedDescription: string;
}

interface IFeaturesList {
  features: ExtendedFeature[];
  searchQuery: string;
}

export const FeaturesList: FC<IFeaturesList> = ({ features, searchQuery }) => (
  <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 tablet:grid-cols-3 gap-6">
    {features.map((feature, index) => (
      <FeatureItem key={index} {...feature} searchQuery={searchQuery} />
    ))}
  </ul>
);
