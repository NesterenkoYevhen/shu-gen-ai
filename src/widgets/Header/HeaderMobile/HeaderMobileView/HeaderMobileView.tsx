'use client';

import { useId, useState } from 'react';
import { useBodyOverflow } from '@/shared/hooks/useBodyOverflow';
import { HeaderMobileControl } from '../HeaderMobileControl';
import { HeaderMobileMenu } from '../HeaderMobileMenu';

export const HeaderMobileView = () => {
  const [isMobileActive, setMobileActive] = useState<boolean>(false);
  const id = useId();

  useBodyOverflow({
    condition: isMobileActive,
    elementId: id,
  });
  return (
    <div className="block xl:hidden">
      <HeaderMobileControl isMobileActive={isMobileActive} setMobileActive={setMobileActive} />
      <HeaderMobileMenu isActive={isMobileActive} setActive={setMobileActive} key={id} />
    </div>
  );
};
