import React from 'react';
import { Loader } from '../Loader/Loader';

export const LoaderBlock = () => (
  <div className="p-16 rounded-3xl flex justify-center bg-additionalGrey100-light dark:bg-additionalGrey100-dark">
    <Loader />
  </div>
);
