// app/layout.tsx
import { Toaster } from 'react-hot-toast';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { ClientProvider } from '@/features/ClientProvider';

import { Header } from '@/widgets/Header';
import { BodyContextProvider } from '@/shared/contexts/BodyContext';
import { Footer } from '@/widgets/Footer';

import '@/styles/globals.scss';

interface LayoutParams {
  locale: string;
}

export default async function RootLayout({
  children, params,
}: {
  children: React.ReactNode;
  params: LayoutParams
}) {
  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/tt-norms-pro"
          rel="stylesheet"
        />
        <meta property="og:title" content="Shu Gen AI - editing tools" />
        <meta property="og:description" content="Quick tools for background removal, object editing, and format conversion—all in one platform" />
        <meta property="og:url" content="https://shu-gen-ai.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/opengraph.png" />
      </head>
      <body suppressHydrationWarning>
        <ClientProvider>
          <NextIntlClientProvider messages={messages}>
            <BodyContextProvider>
              <Header />
              {children}
              <Footer />
              <div id="app-modal" />
              <Toaster
                position="top-right"
                gutter={12}
                containerStyle={{ margin: '8px' }}
                toastOptions={{
                  success: {
                    duration: 3000,
                  },
                  error: {
                    duration: 5000,
                  },
                  style: {
                    fontSize: '16px',
                    maxWidth: '500px',
                    padding: '16px 24px',
                    backgroundColor: '#fff',
                    color: '#000',
                  },
                }}
              />
            </BodyContextProvider>
          </NextIntlClientProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
