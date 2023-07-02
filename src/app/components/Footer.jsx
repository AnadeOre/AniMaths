import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <small>
        Copyright &copy; <span id='copyright'></span>{' '}
        <Link href='https://github.com/AnadeOre'>AnadeOre</Link> | All rights
        reserved{' '}
      </small>
    </footer>
  );
}
