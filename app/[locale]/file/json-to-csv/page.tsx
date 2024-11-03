import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="file.json-to-csv"
    allowedExtensions={['application/json']}
  />
);

export default Page;
