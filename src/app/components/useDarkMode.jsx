'use client';
import React, {useEffect, useState} from 'react';

function useDarkMode() {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.theme : 'dark'
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('theme', theme);
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return [theme, setTheme];
}

export default useDarkMode;
