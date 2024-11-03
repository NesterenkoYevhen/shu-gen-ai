import { FileTransformationView } from '@/views/FileTransformationView';

const Page = () => (
  <FileTransformationView
    featureType="file.xls-to-csv"
    allowedExtensions={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
  />
);

export default Page;
