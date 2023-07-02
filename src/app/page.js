import styles from './styles/Home.module.css';
import Card from './components/Card';
import Layout from './components/Layout';

export default function Home() {
  return (
    <Layout className={styles.container} whereTo={false}>
      <h1 className={styles.title}>
        Welcome to <strong className='text-gradient'>AniMaths!</strong>
      </h1>

      <p className={styles.description}>
        The website where you learn maths with animations.
      </p>
      <br />
      <div className='link-card-grid'>
        <Card
          title='Conic Sections'
          url='/Conics/'
          description='Definition. Plots. Translations...'
        />

        <Card
          title='Limits'
          url='/Limits/Definition'
          description='Definition, Properties...'
        />
      </div>
    </Layout>
  );
}
