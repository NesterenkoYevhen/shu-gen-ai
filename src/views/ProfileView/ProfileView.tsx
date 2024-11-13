import { Container } from '@/shared/ui-kit/Container';
import { redirect } from '@/features/LocaleNavigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/lib/auth';
import { ProfileNavigation } from './ProfileNavigation';
import { ProfileSections } from './ProfileSections';

export const ProfileView = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }
  return (
    <Container className="mt-8 tablet:mt-20 flex justify-between gap-6 relative flex-wrap tablet:flex-nowrap">
      <ProfileNavigation />
      <ProfileSections />
    </Container>
  );
};
