import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.alignItems}>
          Welcome
        </h1>
        <button className={styles.alignItems} onClick={() => 
          router.push('/api/auth/login')}>
            Login
        </button>
      </div>
    </>
  )
}
