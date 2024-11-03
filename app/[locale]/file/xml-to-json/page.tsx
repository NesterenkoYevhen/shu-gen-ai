import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="file.xml-to-json"
    allowedExtensions={['application/xml', 'text/xml']}
  />
);

export default Page;
