'use client';
import styles from '../styles/Home.module.css';
import Card from '../components/Card';
import Layout from '../components/Layout';

export default function Page() {
  return (
    <Layout className={styles.container} whereTo='/'>
      <h1 className={styles.title}>
        <strong className='text-gradient'>Limits</strong>
      </h1>
      <br />
      <div className='link-card-grid'>
        <Card
          title='Functions'
          url='/Limits/Functions'
          description='Definition, Examples...'
        />

        <Card
          title='Sequences'
          url='/Limits/Sequences'
          description='Definition, Examples...'
        />
      </div>
    </Layout>
  );
}
