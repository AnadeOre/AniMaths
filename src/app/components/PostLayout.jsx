import Layout from './Layout';
import stylesPosts from './Posts.module.css';

export default function PostLayout({children, titleName}) {
  return (
    <Layout whereTo='/Conics'>
      <br />
      <div className={stylesPosts.content}>
        <h1>{titleName}</h1>
        <br />
        {children}
      </div>
    </Layout>
  );
}
