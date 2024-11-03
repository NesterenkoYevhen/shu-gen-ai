import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="image.tiff-to-jpg"
    allowedExtensions={['image/tiff']}
  />
);

export default Page;
