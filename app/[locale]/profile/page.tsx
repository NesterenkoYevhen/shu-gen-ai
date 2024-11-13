import { LoaderBlock } from '@/shared/ui-kit/LoaderBlock';
import { ProfileView } from '@/views/ProfileView';
import { Suspense } from 'react';

const Page = () => (
  <Suspense fallback={<LoaderBlock />}>
    <ProfileView />
  </Suspense>
);
export default Page;
