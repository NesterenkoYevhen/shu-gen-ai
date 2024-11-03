import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="image.compress"
    allowedExtensions={[
      'image/png',
      'image/jpeg',
      'image/heic',
      'image/tiff',
      'image/x-raw',
      'image/webp',
      'image/svg+xml',
    ]}
  />
);

export default Page;
