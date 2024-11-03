import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="video.mkv-to-mp4"
    allowedExtensions={['video/x-matroska']}
  />
);

export default Page;
