import ButtonHome from './ButtonHome';
import stylesPosts from './Posts.module.css';

export default function PostLayout({children, titleName, whereTo}) {
  return (
    <div className={stylesPosts.container}>
      <ButtonHome whereTo={whereTo} />
      <br />
      <br />
      <div className={stylesPosts.content}>
        <h1>{titleName}</h1>
        <br />
        {children}
      </div>
    </div>
  );
}
