import Link from 'next/link';

export default function Footer({title, url, description}) {
  return (
    <li className='link-card'>
      <Link href={url}>
        <h3>{title} &rarr;</h3>
        <p>{description}</p>
      </Link>
    </li>
  );
}
