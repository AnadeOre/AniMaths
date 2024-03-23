'use client';
import styles from './styles/Home.module.css';
import Card from './components/Card';
import {useSelector} from 'react-redux';
export default function Home() {
  const lang = useSelector((state) => state.langToggle.value);
  return (
    <div>
      <h1 className={styles.title}>
        {lang === 'en' ? 'Welcome to ' : 'Bienvenidos a '}
        <strong className='text-gradient'>AniMaths!</strong>
      </h1>
      {lang === 'en' ? (
        <p className={styles.description}>
          A website to learn maths with animations.
        </p>
      ) : (
        <p className={styles.description}>
          La página web para aprender matemática con animaciones.
        </p>
      )}
      <br />
      <div className='link-card-grid'>
        <Card
          title={lang === 'en' ? 'Conic Sections' : 'Secciones Cónicas'}
          url='/Conics/'
        />
        <Card title={lang === 'en' ? 'Limits' : 'Límites'} url='/Limits/' />
      </div>
    </div>
  );
}
