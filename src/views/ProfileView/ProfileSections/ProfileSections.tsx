import { Suspense } from 'react';
import { LoaderBlock } from '@/shared/ui-kit/LoaderBlock';
import { Account } from './Account';
import { DeleteAccount } from './DeleteAccount';
import { Membership } from './Membership';
import { Notifications } from './Notifications';
import { Password } from './Password';
import { PaymentDetails } from './PaymentDetails';
import { PersonalInfo } from './PersonalInfo';
import { RecentTools } from './RecentTools';

export const ProfileSections = () => (
  <div className="w-full tablet:w-[74%] flex flex-col gap-6">
    <Account />
    <PersonalInfo />
    <Membership />
    <Suspense fallback={<LoaderBlock />}>
      <PaymentDetails />
    </Suspense>

    <RecentTools />
    <Notifications />
    <Password />
    <DeleteAccount />
  </div>
);
