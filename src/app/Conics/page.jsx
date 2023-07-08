'use client';
import styles from '../styles/layout.module.css';
import Card from '../components/Card';
import ButtonHome from '../components/ButtonHome';

export default function Page() {
  return (
    <div className={styles.container}>
      <ButtonHome whereTo='/' />
      <h1 className={styles.title}>
        <strong className='text-gradient'>Conic Sections</strong>
      </h1>
      <br />
      <br />
      <br />
      <div className='link-card-grid'>
        <Card
          title='Ellipses'
          url='/Conics/Ellipse'
          description='Definition, translations, dilatations...'
        />

        <Card
          title='Parabolas'
          url='/Conics/Parabola'
          description='Definition, Properties...'
        />

        <Card
          title='Hyperbolas'
          url='/Conics/Hyperbola'
          description='Definition, Properties...'
        />
      </div>
    </div>
  );
}
