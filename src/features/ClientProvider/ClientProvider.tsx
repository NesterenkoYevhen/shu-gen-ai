'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export const ClientProvider = ({ children } : { children: ReactNode }) => <SessionProvider>{children}</SessionProvider>;
