import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="pdf.compress"
    allowedExtensions={['application/pdf']}
  />
);

export default Page;
