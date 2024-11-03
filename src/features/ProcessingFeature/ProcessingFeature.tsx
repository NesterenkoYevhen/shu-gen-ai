import { Loader } from '@/shared/ui-kit/Loader';

export const ProcessingFeature = () => (
  <div className="w-full flex justify-center">
    <div className="mt-10 w-[833px] h-[393px] rounded-[40px] flex justify-center items-center bg-additionalGrey200-light dark:bg-additionalGrey200-dark border-4 border-transparent">
      <Loader />
    </div>
  </div>
);
