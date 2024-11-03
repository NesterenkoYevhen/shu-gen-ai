import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="video.compress"
    allowedExtensions={['video/mp4']}
  />
);

export default Page;
