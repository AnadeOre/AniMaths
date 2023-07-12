import styles from '../styles/layout.module.css';
import {useSelector} from 'react-redux';

import Link from 'next/link';
function ButtonHome({whereTo}) {
  const lang = useSelector((state) => state.langToggle.value);
  return (
    <div>
      {whereTo && (
        <div className={styles.linkCard}>
          <Link href={`${whereTo}`}>
            {lang === 'en' ? (
              <h3 className={styles.textCard}>
                &larr; Back{whereTo === '/' ? ' to home' : ''}
              </h3>
            ) : (
              <h3 className={styles.textCard}>
                &larr; Volver{whereTo === '/' ? ' a home' : ''}
              </h3>
            )}
          </Link>
          <br />
        </div>
      )}
    </div>
  );
}

export default ButtonHome;
