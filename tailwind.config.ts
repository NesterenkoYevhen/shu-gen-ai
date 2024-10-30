import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        xl: '20px',
      },
      screens: {
        '2xl': '1700px',
        xl: '1300px',
        start: '95vw',
      },
    },
    screens: {
      '4xl': '1920px',
      '3xl': '1700px',
      '2xl': '1440px',
      xl: '1200px',
      laptop: '1024px',
      tablet: '991px',
      md: '768px',
      mobile: '600px',
      sm: '480px',
      start: '0px',
    },
    fontFamily: {
      TTNormsPro: ['TT Norms Pro', 'sans-serif'],
    },
    colors: {
      background: {
        light: '#ffffff',
        dark: '#1C1C1C',
      },
      text: {
        light: '#18181A',
        dark: '#ffffff',
      },
      primaryGreen: {
        light: '#B9FF66',
        dark: '#B9FF66',
      },
      secondaryGreen: {
        light: '#5B9611',
        dark: '#B9FF66',
      },
      secondaryPurple: {
        light: '#E7BCFF',
        dark: '#B52CFF',
      },
      additionalGrey500: {
        light: '#1C1C1C',
        dark: '#1C1C1C',
      },
      additionalGrey400: {
        light: '#373737',
        dark: '#373737',
      },
      additionalGrey300: {
        light: '#4D4D4D',
        dark: '#FFFFFF',
      },
      additionalGrey200: {
        light: '#F4F4F4',
        dark: '#373737',
      },
      additionalGrey100: {
        light: '#F8F8F8',
        dark: '#373737',
      },
      additionalGreen: {
        light: '#D4FF80',
        dark: '#D4FF80',
      },
      neutralsGrey800: {
        light: '#18181A',
        dark: '#FFFFFF',
      },
      neutralsGrey700: {
        light: '#323236',
        dark: '#DBDBE2',
      },
      neutralsGrey600: {
        light: '#686970',
        dark: '#DBDBE2',
      },
      neutralsGrey500: {
        light: '#8E8F96',
        dark: '#B6B6BC',
      },
      neutralsGrey400: {
        light: '#B6B6BC',
        dark: '#B6B6BC',
      },
      neutralsGrey300: {
        light: '#D2D2D8',
        dark: '#373737',
      },
      neutralsGrey200: {
        light: '#DBDBE2',
        dark: '#DBDBE2',
      },
      neutralsGrey100: {
        light: '#F5F6FA',
        dark: '#373737',
      },
      grey1: {
        light: '#E5E5E5',
        dark: '#53545A',
      },
      grey2: {
        light: '#D2D2D8',
        dark: '#D2D2D8',
      },
      overlay: {
        light: 'rgba(26, 26, 26, 0.3)',
        dark: 'rgba(45, 44, 44, 0.5)',
      },
      red: '#FF574D',
      systemRed: '#FF3535',
      purple: '#920DDA',
      transparent: 'transparent',
      greenSwitch: '#34C759',
    },
    boxShadow: {
      menuLight: '0px 12px 40px 0px #0000001F',
      menuDark: '0px 8px 40px 0px #B7B7B70A',
    },
    extend: {
      fontSize: {
        title1: ['40px', { lineHeight: '120%', fontWeight: '600' }],
        title2: ['32px', { lineHeight: '120%', fontWeight: '600' }],
        title3: ['24px', { lineHeight: '120%', fontWeight: '600' }],
        title4: ['18px', { lineHeight: '120%', fontWeight: '600' }],
        title5: ['16px', { lineHeight: '120%', fontWeight: '600' }],
        main: ['16px', { lineHeight: '150%', fontWeight: '400' }],
        secondary: ['14px', { lineHeight: '150%', fontWeight: '400' }],
        small: ['12px', { lineHeight: '150%', fontWeight: '400' }],
        label: ['16px', { lineHeight: '150%', fontWeight: '400' }],
        button: ['16px', { lineHeight: '120%', fontWeight: '600' }],
        error: ['14px', { lineHeight: '150%', fontWeight: '400' }],
        input: ['16px', { lineHeight: '150%', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};

export default config;
