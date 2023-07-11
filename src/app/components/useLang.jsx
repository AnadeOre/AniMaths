'use client';
import {useEffect, useState} from 'react';

function useLang() {
  const [lang, setLang] = useState(
    localStorage.lang !== undefined ? localStorage.lang : 'en'
  );

  useEffect(() => {
    if (localStorage.lang === undefined) {
      localStorage.setItem('lang', 'en');
      document.documentElement.setAttribute('lang', 'en');
    } else {
      localStorage.setItem('lang', lang);
      document.documentElement.setAttribute('lang', lang);
    }
    // }
  }, [lang]);

  return [lang, setLang];
}

export default useLang;
