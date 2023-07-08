import styles from './styles/Home.module.css';
import Card from './components/Card';
// import Layout from './components/Layout';

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>
        Welcome to <strong className='text-gradient'>AniMaths!</strong>
      </h1>
      <p className={styles.description}>
        The website where you learn maths with animations.
      </p>
      <br />
      <div className='link-card-grid'>
        <Card title='Conic Sections' url='/Conics/' />
        <Card title='Limits' url='/Limits/' />
        <Card title='Limit2' url='/Limits/' />
        <Card title='Limit2' url='/Limits/' />
        <Card title='Limit3' url='/Limits/' />
        <Card title='Limit4' url='/Limits/' />
        <Card title='Limit5' url='/Limits/' />
        <Card title='Limit6' url='/Limits/' />
      </div>
    </div>
  );
}
