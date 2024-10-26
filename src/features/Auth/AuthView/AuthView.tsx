import { FC, ReactNode } from 'react';

import { useBodyOverflow } from '@/shared/hooks/useBodyOverflow';

import { ModalWindow } from '@/shared/ui-kit/ModalWindow';
import { Portal } from '@/shared/ui-kit/Portal';

interface IAuthView {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  children: ReactNode;
}

export const AuthView:FC<IAuthView> = ({
  isOpen, id, onClose, children,
}) => {
  useBodyOverflow({
    condition: isOpen,
    elementId: id,
  });
  return (
    <Portal>
      <ModalWindow isOpen={isOpen} onClose={onClose} key={id}>
        {children}
      </ModalWindow>
    </Portal>
  );
};
