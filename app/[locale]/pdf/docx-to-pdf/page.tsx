import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="pdf.docx-to-pdf"
    allowedExtensions={['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
  />
);

export default Page;
