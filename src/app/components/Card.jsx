import Link from 'next/link';

export default function Footer({title, url}) {
  return (
    <div className='link-card'>
      <Link href={url}>
        <h2>{title}</h2>
      </Link>
    </div>
  );
}
