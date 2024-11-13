'use client';

import {
  FC,
  useId, useRef, useState,
  useTransition,
} from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { useBodyOverflow } from '@/shared/hooks/useBodyOverflow';
import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { ModalWindow } from '@/shared/ui-kit/ModalWindow';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import toast from 'react-hot-toast';
import InputMask from 'react-input-mask';
import { Textfield } from '@/shared/ui-kit/Textfield';
import { PlanAPIType } from '@/shared/types/common';
import { createSubscriptions } from '@/shared/actions/subscriptions';

interface IPayment {
  tarrifId: PlanAPIType;
  label: string;
  isPopular?: boolean;
  duration: number;
}

export const Payment: FC<IPayment> = ({
  tarrifId, label, isPopular, duration,
}) => {
  const t = useTranslations('main-page.plans');
  const formRef = useRef<HTMLFormElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardNumberError, setCardNumberError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const id = useId();

  const validateCardNumber = (cardNumber: string) => {
    const cleanedNumber = cardNumber.replace(/\s+/g, '');
    if (cleanedNumber.length !== 16 || !/^\d{16}$/.test(cleanedNumber)) {
      return t('card-error');
    }
    return null;
  };

  useBodyOverflow({ condition: isModalOpen, elementId: id });

  return (
    <>
      <ModalWindow isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} key={id}>
        <div className="w-[297px] sm:w-[357px] h-[300px] flex flex-col gap-4">
          <Typography variant={TypographyVariants.TITLE_3} className="text-center">
            {t('modal-title')}
          </Typography>
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const cardNumber = formData.get('card_number') as string;

              startTransition(async () => {
                const cardNumberErrorTemp = validateCardNumber(cardNumber);
                setCardNumberError(cardNumberErrorTemp);

                if (!cardNumberErrorTemp) {
                  try {
                    await createSubscriptions(tarrifId, duration.toString(), locale);
                    formRef.current?.reset();
                    setIsModalOpen(false);
                    toast.success(t('success-pay'));
                  } catch (error) {
                    toast.error(t('error-pay'));
                  }
                }
              });
            }}
          >
            <fieldset>
              <Textfield
                label={t('order-label')}
                isRequired
                name="price"
                type="text"
                value={`${t(`${label}.title`)} ${t(`${label}.price-value`)}`.toUpperCase()}
                readOnly
              />
            </fieldset>
            <fieldset>
              <InputMask mask="9999 9999 9999 9999">
                {(inputProps) => (
                  <Textfield
                    {...inputProps}
                    label={t('card-label')}
                    isRequired
                    placeholder="XXXX XXXX XXXX XXXX"
                    name="card_number"
                    type="text"
                    error={cardNumberError}
                  />
                )}
              </InputMask>
            </fieldset>
            <fieldset className="mt-5">
              <Button variant={ButtonVariants.PRIMARY} width="100%" type="submit" disabled={isPending}>
                {isPending ? t('pay-pending') : t('pay')}
              </Button>
            </fieldset>
          </form>
        </div>
      </ModalWindow>
      <Button
        variant={isPopular ? ButtonVariants.PRIMARY : ButtonVariants.SECONDARY}
        width="205px"
        className="mt-4"
        onClick={() => setIsModalOpen(true)}
      >
        {t('subscribe')}
      </Button>
    </>
  );
};
