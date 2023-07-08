import styles from '../styles/layout.module.css';
import Link from 'next/link';
function ButtonHome({whereTo}) {
  return (
    <div>
      {whereTo && (
        <div className={styles.linkCard}>
          <Link href={`${whereTo}`}>
            <h3 className={styles.textCard}>
              &larr; Back{whereTo === '/' ? ' to home' : ''}
            </h3>
          </Link>
          <br />
        </div>
      )}
    </div>
  );
}

export default ButtonHome;
