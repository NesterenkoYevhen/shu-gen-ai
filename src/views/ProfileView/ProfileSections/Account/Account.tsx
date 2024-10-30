import { useTranslations } from 'next-intl';

import { MdOutlineEdit } from 'react-icons/md';

import { Button, ButtonVariants } from '@/shared/ui-kit/Button';
import { ButtonSize } from '@/shared/ui-kit/Button/Button';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

const mockedUser = {
  userName: 'Yevhen',
  email: 'yevhenn@gmail.com',
};

export const Account = () => {
  const t = useTranslations('profile.account');
  return (
    <section className="p-6 rounded-3xl flex flex-col gap-6 bg-additionalGrey100-light dark:bg-additionalGrey100-dark scroll-mt-32" id="my-account">
      <Typography variant={TypographyVariants.TITLE_3}>{t('title')}</Typography>

      <div className="flex gap-6 tablet:gap-1 items-center justify-between flex-wrap">
        <div className="flex gap-6 w-fit">
          <div className="w-[64px] h-[64px] bg-secondaryGreen-light flex items-center justify-center text-background-light text-2xl font-semibold rounded-full">
            {mockedUser.userName.toUpperCase().substring(0, 1)}
          </div>
          <div className="flex flex-col justify-between py-[2.5px]">
            <Typography variant={TypographyVariants.TITLE_4}>{mockedUser.userName}</Typography>
            <Typography variant={TypographyVariants.MAIN}>{mockedUser.email}</Typography>
          </div>
        </div>
        <Button StartIcon={MdOutlineEdit} startIconClassName="text-2xl" variant={ButtonVariants.SECONDARY} size={ButtonSize.SMALL} width="150px">
          {t('edit')}
        </Button>
      </div>
    </section>
  );
};
