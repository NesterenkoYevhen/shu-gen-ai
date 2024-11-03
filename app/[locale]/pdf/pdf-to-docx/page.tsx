import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="pdf.pdf-to-docx"
    allowedExtensions={['application/pdf']}
  />
);

export default Page;
