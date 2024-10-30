'use client';

import {
  useId, useMemo, useRef, useState,
} from 'react';
import { useTranslations } from 'next-intl';
import { Option } from 'react-dropdown';

import { tarrifs } from '@/shared/constants/tarrifs';

import { useBodyOverflow } from '@/shared/hooks/useBodyOverflow';

import { Button, ButtonSize, ButtonVariants } from '@/shared/ui-kit/Button';
import { ModalWindow } from '@/shared/ui-kit/ModalWindow';
import { Select } from '@/shared/ui-kit/Select';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import toast from 'react-hot-toast';

const mockedCard = [
  { id: 1, type: 'VISA', number: '1234 5678 9012 3456' },
  { id: 2, type: 'MASTERCARD', number: '0987 6543 2109 8765' },
];

export const ChangePlan = () => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosenTariff, setChosenTariff] = useState<Option | null>(null);
  const [chosenCard, setChosenCard] = useState<Option | null>(null);

  const tariffsOptions = useMemo(
    () => tarrifs.map((tariff) => ({ value: tariff.id, label: `${tariff.price} ${t(tariff.label)}` })),
    [t],
  );

  const cardsOptions = useMemo(
    () => mockedCard.map((card) => ({ value: card.id.toString(), label: `${card.number} ${card.type}` })),
    [],
  );

  const id = useId();

  useBodyOverflow({ condition: isModalOpen, elementId: id });

  const handleSubmitChangePlan = () => {
    toast.success(t('profile.membership.change-success'));
    formRef.current?.reset();
    setIsModalOpen(false);
  };

  return (
    <>
      <ModalWindow isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} key={id}>
        <div className="w-[297px] sm:w-[357px] h-[350px] flex flex-col gap-4">
          <Typography variant={TypographyVariants.TITLE_3} className="text-center">
            {t('profile.membership.change-plan')}
          </Typography>
          <div className="mt-5">
            <Typography variant={TypographyVariants.LABEL}>{t('profile.membership.plans-title')}</Typography>
            <Select list={tariffsOptions} onChange={setChosenTariff} placeholder={t('profile.membership.plans-placeholder')} className="mt-1" />
          </div>
          <div>
            <Typography variant={TypographyVariants.LABEL}>{t('profile.membership.cards-title')}</Typography>
            <Select list={cardsOptions} onChange={setChosenCard} placeholder={t('profile.membership.cards-placeholder')} className="mt-1" />
          </div>
          <Button variant={ButtonVariants.PRIMARY} width="100%" type="submit" disabled={!chosenCard || !chosenTariff} className="mt-5" onClick={handleSubmitChangePlan}>
            {t('profile.membership.change')}
          </Button>
        </div>
      </ModalWindow>
      <Button variant={ButtonVariants.BORDER_GREY} size={ButtonSize.SMALL} width="195px" className="!w-full tablet:!w-[195px]" onClick={() => setIsModalOpen(true)}>
        {t('profile.membership.change-plan')}
      </Button>
    </>
  );
};
