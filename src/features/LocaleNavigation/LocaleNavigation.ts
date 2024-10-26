import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'ua'] as const;

export const pathnames = {
  '/': '/',
  '/search': '/search',
  '/pdf/docx-to-pdf': '/pdf/docx-to-pdf',
  '/pdf/pdf-to-docx': '/pdf/pdf-to-docx',
  '/pdf/compress': '/pdf/compress',
  '/file/xml-to-json': '/file/xml-to-json',
  '/file/json-to-xml': '/file/json-to-xml',
  '/file/xml-to-csv': '/file/xml-to-csv',
  '/file/json-to-csv': '/file/json-to-csv',
  '/file/xls-to-csv': '/file/xls-to-csv',
  '/file/xls-to-json': '/file/xls-to-json',
  '/file/xls-to-xml': '/file/xls-to-xml',
  '/video/compress': '/video/compress',
  '/video/video-to-gif': '/video/video-to-gif',
  '/video/mkv-to-mp4': '/video/mkv-to-mp4',
  '/video/mp4-to-mp3': '/video/mp4-to-mp3',
  '/write/summary': '/write/summary',
  '/write/rewriter': '/write/rewriter',
  '/write/essay': '/write/essay',
  '/write/paragraph': '/write/paragraph',
  '/write/grammar-checker': '/write/grammar-checker',
  '/write/post': '/write/post',
  '/write/code-documentation': '/write/code-documentation',
  '/image/remove-the-background': '/image/remove-the-background',
  '/image/cut-out-an-object': '/image/cut-out-an-object',
  '/image/pick-up-an-object': '/image/pick-up-an-object',
  '/image/edit-the-background': '/image/edit-the-background',
  '/image/black-and-white': '/image/black-and-white',
  '/image/round': '/image/round',
  '/image/pixelate': '/image/pixelate',
  '/image/blur': '/image/blur',
  '/image/compress': '/image/compress',
  '/image/heic-to-jpg': '/image/heic-to-jpg',
  '/image/png-to-jpg': '/image/png-to-jpg',
  '/image/raw-to-jpg': '/image/raw-to-jpg',
  '/image/tiff-to-jpg': '/image/tiff-to-jpg',
} as const;

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  pathnames,
});

export type PathnamesType = keyof typeof pathnames;

export const {
  Link, redirect, usePathname, useRouter,
} = createLocalizedPathnamesNavigation({ locales, pathnames });
