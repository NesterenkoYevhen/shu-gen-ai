// src/types/react-input-mask.d.ts

declare module 'react-input-mask' {
  import { ComponentType } from 'react';

  interface InputProps {
    mask: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children: (inputProps: any) => ReactNode;
    maskChar?: null;
    defaultValue?: any;
  }

  const InputMask: ComponentType<InputProps>;

  export default InputMask;
}
