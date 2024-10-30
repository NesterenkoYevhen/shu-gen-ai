import cn from 'classnames';

import { useTranslations } from 'next-intl';

import MyProfileLight from '@/assets/icons/profile/my-profile-light.svg';
import MyProfileDark from '@/assets/icons/profile/my-profile-dark.svg';
import MembershipLight from '@/assets/icons/profile/membership-light.svg';
import MembershipDark from '@/assets/icons/profile/membership-dark.svg';
import NotificationsLight from '@/assets/icons/profile/notifications-light.svg';
import NotificationsDark from '@/assets/icons/profile/notifications-dark.svg';
import RecentToolsLight from '@/assets/icons/profile/recent-tools-light.svg';
import RecentToolsDark from '@/assets/icons/profile/recent-tools-dark.svg';
import PasswordLight from '@/assets/icons/profile/password-light.svg';
import PasswordDark from '@/assets/icons/profile/password-dark.svg';
import DeleteLight from '@/assets/icons/profile/delete-account-light.svg';
import DeleteDark from '@/assets/icons/profile/delete-account-dark.svg';

import { ProfileNavItem } from './ProfileNavItem';
import { Logout } from './Logout';

import styles from './ProfileNavigation.module.scss';

const navItems = [
  {
    href: '#my-account', lightIcon: MyProfileLight, darkIcon: MyProfileDark, label: 'item-1',
  },
  {
    href: '#membership', lightIcon: MembershipLight, darkIcon: MembershipDark, label: 'item-2',
  },
  {
    href: '#recent-tools', lightIcon: RecentToolsLight, darkIcon: RecentToolsDark, label: 'item-3',
  },
  {
    href: '#notifications', lightIcon: NotificationsLight, darkIcon: NotificationsDark, label: 'item-4',
  },
  {
    href: '#password', lightIcon: PasswordLight, darkIcon: PasswordDark, label: 'item-5',
  },
  {
    href: '#delete-account', lightIcon: DeleteLight, darkIcon: DeleteDark, label: 'item-6',
  },
];

export const ProfileNavigation = () => {
  const t = useTranslations('profile.navigation');

  return (
    <ul className={cn('w-full tablet:w-[24%] flex flex-row tablet:flex-col gap-4 tablet:sticky tablet:top-32 h-fit overflow-auto', styles.profileNavigation)}>
      {navItems.map((item, index) => (
        <ProfileNavItem
          key={index}
          href={item.href}
          lightIcon={item.lightIcon}
          darkIcon={item.darkIcon}
          label={t(item.label)}
        />
      ))}
      <li>
        <Logout />
      </li>
    </ul>
  );
};
