'use client';
import styles from '../styles/layout.module.css';
import Card from '../components/Card';
import ButtonHome from '../components/ButtonHome';
import {useSelector} from 'react-redux';

export default function Page() {
  const lang = useSelector((state) => state.langToggle.value);

  return (
    <div className={styles.container}>
      <ButtonHome whereTo='/' />
      {lang === 'en' ? (
        <h1 className={styles.title}>
          <strong className='text-gradient'>Conic Sections</strong>
        </h1>
      ) : (
        <h1 className={styles.title}>
          <strong className='text-gradient'>Secciones Cónicas</strong>
        </h1>
      )}
      <br />
      <br />
      <br />
      <div className='link-card-grid'>
        <Card
          title={lang === 'en' ? 'Parabolas' : 'Parábolas'}
          url='/Conics/Parabola'
        />
        <Card
          title={lang === 'en' ? 'Ellipses' : 'Elipses'}
          url='/Conics/Ellipse'
        />
        <Card
          title={lang === 'en' ? 'Hyperbolas' : 'Hipérbolas'}
          url='/Conics/Hyperbola'
        />
      </div>
    </div>
  );
}
