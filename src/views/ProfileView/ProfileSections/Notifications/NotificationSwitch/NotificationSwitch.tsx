import { FC } from 'react';

import { Switch } from '@headlessui/react';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

interface INotificationSwitch {
  title: string;
  description: string;
  defaultChecked?: boolean;
}

export const NotificationSwitch:FC<INotificationSwitch> = ({ title, description, defaultChecked = false }) => (
  <div className="mt-8 flex gap-4 items-start">
    <Switch
      defaultChecked={defaultChecked}
      className="group inline-flex h-6 min-w-11 max-w-11 items-center rounded-full bg-neutralsGrey400-light data-[checked]:bg-greenSwitch"
    >
      <span className="size-5 translate-x-1 rounded-full bg-background-light transition group-data-[checked]:translate-x-5" />
    </Switch>
    <div>
      <Typography variant={TypographyVariants.TITLE_4}>{title}</Typography>
      <Typography variant={TypographyVariants.MAIN} className="mt-2 text-neutralsGrey600-light dark:text-neutralsGrey400-dark">
        {description}
      </Typography>
    </div>
  </div>
);
