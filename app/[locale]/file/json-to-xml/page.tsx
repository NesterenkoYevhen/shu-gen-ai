import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="file.json-to-xml"
    allowedExtensions={['application/json']}
  />
);

export default Page;
