'use client';
import React, {useEffect, useState} from 'react';

function useDarkMode() {
  const [theme, setTheme] = useState(
    localStorage.theme !== 'undefined' ? localStorage.theme : 'dark'
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('theme', theme);
  }, [theme]);

  return [theme, setTheme];
}

export default useDarkMode;
