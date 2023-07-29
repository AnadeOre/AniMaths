'use client';
import styles from '../styles/Home.module.css';
import Card from '../components/Card';
import ButtonHome from '../components/ButtonHome';
import Link from 'next/link';

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
      <h2>
        Nothing to see here yet, go to <Link href='/Conics/'>Conics</Link>.
      </h2>
      {/* <div className='link-card-grid'>
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
      </div> */}
    </div>
  );
}
