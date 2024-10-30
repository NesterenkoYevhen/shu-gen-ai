import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { Card } from './Card';
import { CardAdd } from './CardAdd';

const mockedCard = [
  { id: 1, type: 'VISA', number: '1234 5678 9012 3456' },
  { id: 2, type: 'MASTERCARD', number: '0987 6543 2109 8765' },
];

export const PaymentDetails = () => (
  <section className="p-6 rounded-3xl flex flex-col gap-6 bg-additionalGrey100-light dark:bg-additionalGrey100-dark">
    <Typography variant={TypographyVariants.TITLE_3}>Payment details</Typography>
    <ul className="flex flex-col gap-3">
      {mockedCard.map(({ id, type, number }) => <Card id={id} number={number} type={type} key={id} />)}
    </ul>
    <CardAdd />
  </section>
);
