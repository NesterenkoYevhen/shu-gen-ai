import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="image.heic-to-jpg"
    allowedExtensions={['image/heic']}
  />
);

export default Page;
