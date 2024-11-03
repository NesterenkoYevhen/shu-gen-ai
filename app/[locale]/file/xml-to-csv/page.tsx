import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="file.xml-to-csv"
    allowedExtensions={['application/xml', 'text/xml']}
  />
);

export default Page;
