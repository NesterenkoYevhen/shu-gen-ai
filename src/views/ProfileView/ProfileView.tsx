import { Container } from '@/shared/ui-kit/Container';
import { ProfileNavigation } from './ProfileNavigation';
import { ProfileSections } from './ProfileSections';

export const ProfileView = () => (
  <Container className="mt-8 tablet:mt-20 flex justify-between gap-6 relative flex-wrap tablet:flex-nowrap">
    <ProfileNavigation />
    <ProfileSections />
  </Container>
);
