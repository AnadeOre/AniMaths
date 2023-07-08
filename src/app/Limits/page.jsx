'use client';
import styles from '../styles/Home.module.css';
import Card from '../components/Card';
import ButtonHome from '../components/ButtonHome';

export default function Page() {
  return (
    <div className={styles.container}>
      <ButtonHome whereTo='/' />
      <h1 className={styles.title}>
        <strong className='text-gradient'>Limits</strong>
      </h1>
      <br />
      <br />
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
    </div>
  );
}
