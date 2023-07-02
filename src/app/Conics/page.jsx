'use client';
import styles from '../styles/Home.module.css';
import Card from '../components/Card';
import Layout from '../components/Layout';

export default function Page() {
  return (
    <Layout className={styles.container} whereTo='/'>
      <h1 className={styles.title}>
        <strong className='text-gradient'>Conic Sections</strong>
      </h1>
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
    </Layout>
  );
}
