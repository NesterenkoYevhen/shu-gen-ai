import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { getCards } from '@/shared/actions/cards';
import { getTranslations } from 'next-intl/server';
import { Card } from './Card';
import { CardAdd } from './CardAdd';

export const PaymentDetails = async () => {
  const t = await getTranslations('profile.payment-details');
  const cards = await getCards();

  return (
    <section className="p-6 rounded-3xl flex flex-col gap-6 bg-additionalGrey100-light dark:bg-additionalGrey100-dark">
      <Typography variant={TypographyVariants.TITLE_3}>{t('title')}</Typography>
      {cards?.length ? (
        <ul className="flex flex-col gap-3">
          {cards.map(({ id, card_number, card_type }) => <Card id={id} number={card_number} type={card_type} key={id} />)}
        </ul>
      ) : <Typography variant={TypographyVariants.MAIN} className="text-center">{t('no-cards')}</Typography>}
      <CardAdd />
    </section>
  );
};
