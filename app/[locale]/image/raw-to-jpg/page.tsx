import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="image.raw-to-jpg"
    allowedExtensions={['image/x-raw']}
  />
);

export default Page;
