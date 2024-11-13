import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="image.raw-to-jpg"
    allowedExtensions={[]}
  />
);

export default Page;
