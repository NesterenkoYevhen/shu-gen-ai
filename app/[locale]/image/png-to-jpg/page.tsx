import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="image.png-to-jpg"
    allowedExtensions={['image/png']}
  />
);

export default Page;
