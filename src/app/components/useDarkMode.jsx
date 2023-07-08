'use client';
import {useEffect, useState} from 'react';

function useDarkMode() {
  const [theme, setTheme] = useState(
    localStorage.theme !== undefined ? localStorage.theme : 'light'
  );

  useEffect(() => {
    if (localStorage.theme === undefined) {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('theme', 'light');
    } else {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('theme', theme);
    }
    // }
  }, [theme]);

  return [theme, setTheme];
}

export default useDarkMode;
