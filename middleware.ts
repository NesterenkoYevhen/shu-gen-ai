import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { getSubscription } from '@/shared/endpoints/getSubscription';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ua'],
  defaultLocale: 'en',
});

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as any;
  const response = intlMiddleware(req);
  const protectedPaths: { [key: string]: Array<'FREE' | 'PRO' | 'PRO+'> } = {
    '/pdf/docx-to-pdf': ['FREE', 'PRO', 'PRO+'],
    '/pdf/pdf-to-docx': ['FREE', 'PRO', 'PRO+'],
    '/pdf/compress': ['FREE', 'PRO', 'PRO+'],
    '/file/xml-to-json': ['FREE', 'PRO', 'PRO+'],
    '/file/json-to-xml': ['FREE', 'PRO', 'PRO+'],
    '/file/xml-to-csv': ['FREE', 'PRO', 'PRO+'],
    '/file/json-to-csv': ['FREE', 'PRO', 'PRO+'],
    '/file/xls-to-csv': ['FREE', 'PRO', 'PRO+'],
    '/file/xls-to-json': ['FREE', 'PRO', 'PRO+'],
    '/file/xls-to-xml': ['FREE', 'PRO', 'PRO+'],
    '/image/remove-the-background': ['FREE', 'PRO', 'PRO+'],
    '/image/cut-out-an-object': ['FREE', 'PRO', 'PRO+'],
    '/image/pick-up-an-object': ['PRO', 'PRO+'],
    '/image/edit-the-background': ['PRO', 'PRO+'],
    '/image/black-and-white': ['PRO', 'PRO+'],
    '/image/round': ['PRO', 'PRO+'],
    '/image/pixelate': ['PRO', 'PRO+'],
    '/image/blur': ['PRO', 'PRO+'],
    '/image/compress': ['PRO', 'PRO+'],
    '/image/heic-to-jpg': ['PRO', 'PRO+'],
    '/image/png-to-jpg': ['PRO', 'PRO+'],
    '/image/raw-to-jpg': ['PRO', 'PRO+'],
    '/image/tiff-to-jpg': ['PRO', 'PRO+'],
    '/video/compress': ['PRO', 'PRO+'],
    '/video/video-to-gif': ['PRO', 'PRO+'],
    '/video/mkv-to-mp4': ['PRO', 'PRO+'],
    '/video/mp4-to-mp3': ['PRO', 'PRO+'],
    '/write/summary': ['PRO+'],
    '/write/rewriter': ['PRO+'],
    '/write/essay': ['PRO+'],
    '/write/paragraph': ['PRO+'],
    '/write/grammar-checker': ['PRO+'],
    '/write/post': ['PRO+'],
    '/write/code-documentation': ['PRO+'],
  };

  const { pathname } = req.nextUrl;
  const locale = pathname.split('/')[1];
  const basePath = pathname.replace(`/${locale}`, '') || '/';

  const allowedPlans = protectedPaths[basePath];

  if (allowedPlans && token) {
    const subscription = await getSubscription(token?.accessToken as string);
    if (!subscription?.id || !allowedPlans.includes(subscription?.id)) {
      const redirectResponse = NextResponse.redirect(new URL(`/${locale}/forbidden`, req.url));
      redirectResponse.headers.set('Cache-Control', 'no-store');
      return redirectResponse;
    }
  } else if (allowedPlans && !token) {
    const redirectResponse = NextResponse.redirect(new URL(`/${locale}/forbidden`, req.url));
    redirectResponse.headers.set('Cache-Control', 'no-store');
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
