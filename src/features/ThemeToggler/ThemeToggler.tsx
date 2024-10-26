'use client';

import { useState, useEffect } from 'react';

import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

export const ThemeToggler = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button onClick={toggleTheme} type="button" className="text-2xl p-3 rounded-full bg-neutralsGrey100-light dark:bg-neutralsGrey100-dark">
      {isDark ? <IoSunnyOutline /> : <IoMoonOutline />}
    </button>
  );
};
