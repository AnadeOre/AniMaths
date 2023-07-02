'use client';
import React, {useEffect, useState} from 'react';

function useDarkMode() {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' && localStorage.theme !== 'undefined'
      ? localStorage.theme
      : 'dark'
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('theme', theme);
    }
    document.documentElement.setAttribute('theme', theme);
  }, [theme]);

  return [theme, setTheme];
}

export default useDarkMode;
