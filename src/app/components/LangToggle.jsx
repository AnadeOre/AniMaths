import styles from '../styles/layout.module.css';
import {GB, AR} from 'country-flag-icons/react/3x2';
import useLang from './useLang';

function LangToggle() {
  const [lang, setLang] = useLang();
  const handleClick = () => {
    if (lang === 'es') setLang('en');
    else setLang('es');
  };

  return (
    <div onClick={handleClick}>
      {lang === 'es' ? (
        <div>
          <div className={styles.faded}>
            <GB />
          </div>
          <div>
            <AR />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <GB />
          </div>
          <div className={styles.faded}>
            <AR />
          </div>
        </div>
      )}
    </div>
  );
}

export default LangToggle;
