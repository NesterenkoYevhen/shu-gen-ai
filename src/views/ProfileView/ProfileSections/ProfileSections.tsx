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
    <PaymentDetails />
    <RecentTools />
    <Notifications />
    <Password />
    <DeleteAccount />
  </div>
);
