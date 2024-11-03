import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="video.mp4-to-mp3"
    allowedExtensions={['video/mp4']}
  />
);

export default Page;
