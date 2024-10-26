import { Feature } from '@/shared/types/common';

import { FeatureItem } from '../FeatureItem/FeatureItem';

type IFeaturesList = {
  features: Feature[];
};

export const FeaturesList = ({ features }: IFeaturesList) => (
  <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 tablet:grid-cols-3 gap-6">
    {features.map((feature, index) => (
      <FeatureItem key={index} {...feature} />
    ))}
  </ul>
);
