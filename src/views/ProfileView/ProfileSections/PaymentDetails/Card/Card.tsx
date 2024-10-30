import { FC } from 'react';

import { maskCreditCard } from '@/utils/maskCreditCard';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { CardDelete } from '../CardDelete';

interface ICard {
  id: number;
  type: string;
  number: string;
}

export const Card:FC<ICard> = ({ id, type, number }) => (
  <li className="p-4 rounded-2xl border border-solid border-neutralsGrey300-light flex items-center justify-between w-full">
    <Typography variant={TypographyVariants.MAIN}>
      {type}
      {' '}
      {maskCreditCard(number)}
    </Typography>
    <CardDelete id={id} />
  </li>
);
