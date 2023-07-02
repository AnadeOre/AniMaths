import Layout from './Layout';
import stylesPosts from './Posts.module.css';

export default function PostLayout({children, titleName, whereTo}) {
  return (
    <Layout whereTo={whereTo}>
      <br />
      <div className={stylesPosts.content}>
        <h1>{titleName}</h1>
        <br />
        {children}
      </div>
    </Layout>
  );
}
