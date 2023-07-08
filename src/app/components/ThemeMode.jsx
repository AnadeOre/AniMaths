'use client';
import useDarkMode from './useDarkMode';
import {BsSun, BsMoon} from 'react-icons/bs';

function ThemeMode() {
  const [colorTheme, setTheme] = useDarkMode();
  const handleClick = () => {
    if (colorTheme === 'dark') setTheme('light');
    else setTheme('dark');
  };

  return (
    <div onClick={handleClick}>
      {colorTheme === 'dark' ? <BsSun /> : <BsMoon />}
    </div>
  );
}

export default ThemeMode;
