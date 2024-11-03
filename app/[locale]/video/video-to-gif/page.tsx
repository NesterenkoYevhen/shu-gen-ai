import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="video.video-to-gif"
    allowedExtensions={['video/mp4']}
  />
);

export default Page;
