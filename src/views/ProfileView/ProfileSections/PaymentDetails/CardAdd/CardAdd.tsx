'use client';

import {
  useId, useRef, useState, useTransition,
} from 'react';
import toast from 'react-hot-toast';
import InputMask from 'react-input-mask';

import { useTranslations } from 'next-intl';

import { useBodyOverflow } from '@/shared/hooks/useBodyOverflow';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { ModalWindow } from '@/shared/ui-kit/ModalWindow';
import { Textfield } from '@/shared/ui-kit/Textfield';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import AddIcon from '@/assets/icons/profile/plus.svg';
import { createCard } from '@/shared/actions/cards';
import { usePathname } from 'next/navigation';

export const CardAdd = () => {
  const t = useTranslations('profile.payment-details.card-add');
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const [cardNumberError, setCardNumberError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const pathLocale = pathname.split('/')[1] || 'en';

  const validateCardNumber = (cardNumber: string) => {
    const cleanedNumber = cardNumber.replace(/\s+/g, '');
    if (!/^4|5/.test(cleanedNumber)) {
      return t('invalid-start');
    }
    if (cleanedNumber.length !== 16 || !/^\d{16}$/.test(cleanedNumber)) {
      return t('invalid-card-number');
    }
    return null;
  };

  useBodyOverflow({ condition: isOpen, elementId: id });

  const handleAddCard = async (cardNumber: string) => {
    try {
      await createCard(cardNumber.replace(/\s+/g, ''), pathLocale);
      toast.success(t('success'));
      setIsOpen(false);
      formRef.current?.reset();
    } catch (error) {
      toast.error(t('error'));
    }
  };

  return (
    <>
      <ModalWindow isOpen={isOpen} onClose={() => setIsOpen(false)} key={id}>
        <div className="w-[297px] sm:w-[357px] h-[200px] flex flex-col gap-4">
          <Typography variant={TypographyVariants.TITLE_3} className="text-center">
            {t('title')}
          </Typography>
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const cardNumber = formData.get('card_number') as string;

              startTransition(() => {
                const cardNumberErrorTemp = validateCardNumber(cardNumber);
                setCardNumberError(cardNumberErrorTemp);

                if (!cardNumberErrorTemp) {
                  handleAddCard(cardNumber);
                }
              });
            }}
          >
            <fieldset>
              <InputMask mask="9999 9999 9999 9999">
                {(inputProps) => (
                  <Textfield
                    {...inputProps}
                    label={t('card-number-label')}
                    isRequired
                    placeholder={t('card-number-placeholder')}
                    name="card_number"
                    type="text"
                    error={cardNumberError}
                  />
                )}
              </InputMask>
            </fieldset>
            <fieldset className="mt-5">
              <Button variant={ButtonVariants.PRIMARY} width="100%" type="submit" disabled={isPending}>
                {isPending ? t('submit-pending') : t('submit')}
              </Button>
            </fieldset>
          </form>
        </div>
      </ModalWindow>
      <button type="button" className="flex items-center gap-2 w-fit" onClick={() => setIsOpen(true)}>
        <AddIcon />
        <Typography variant={TypographyVariants.TITLE_5} className="text-neutralsGrey600-light">
          {t('add-new')}
        </Typography>
      </button>
    </>
  );
};
