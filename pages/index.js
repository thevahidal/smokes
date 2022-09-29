import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import ChangeIndicator from '../components/ChangeIndicator';

import styles from '../styles/Home.module.css'

export default function Home() {
  const lightButton = useRef()
  const isFirstLoad = useRef(true);

  const [initialLoading, setInitialLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    userCreatedAt: null,
  })

  useEffect(() => {
    if (!isFirstLoad.current) return;
    isFirstLoad.current = false;
    console.log({ isFirstLoad })
    // get width of light button and set it as height of it too
    lightButton.current.style.height = lightButton.current.offsetWidth + 'px'

    getSmokesCount(true)
  }, [])

  const lightACigarette = async () => {
    setLoading(true)
    const localUserId = document.cookie.includes('userId') ? document.cookie.split('userId=')[1] : null

    const response = await fetch('/api/smokes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localUserId}`
      }
    })
    const { data: { userId, userCreated } } = await response.json()

    // if user id cookie does not exist, set it
    if (userCreated) {
      document.cookie = `userId=${userId}`
    }

    setLoading(false)
    getSmokesCount()
  }

  const getSmokesCount = async (initial) => {
    setLoading(true)
    if (initial) {
      setInitialLoading(true)
    }
    const localUserId = document.cookie.includes('userId') ? document.cookie.split('userId=')[1] : null
    console.log({ localUserId })
    const response = await fetch('/api/smokes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localUserId}`
      }
    })
    const { data: { userId, userCreated, ...rest } } = await response.json()
    console.log({ userId, userCreated, rest })

    // if user id cookie does not exist, set it
    if (userCreated) {
      document.cookie = `userId=${userId}`
    }

    setStats(rest)
    setLoading(false)
    if (initial) {
      setInitialLoading(false)
    }
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>Smokes | Cigarettes Counter</title>
        <meta name="description" content="Count how many cigarettes you smoke per day" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Smokes
        </h1>

        <p className={styles.description}>
          Each time you smoke a cigarette, click the button below.
        </p>

        <div className={styles.lightButtonWrapper}>
          <a
            ref={lightButton}
            onClick={lightACigarette}
            className={`
              ${styles.card} 
              ${styles.rounded} 
              ${styles.lg} 
              ${styles.button}
              ${loading && styles.disabled}
            `}
            disabled={loading}
          >
            🚬
          </a>
          <div className={styles.pulses}>
            <div className={`${styles.pulse} ${loading && styles.disabled}`} />
          </div>
        </div>

        {!initialLoading && <>
          <p className={styles.count}>
            <strong>{stats.today}</strong> Today
            {' '}
            <ChangeIndicator change={stats.today - stats.yesterday} />
          </p>
          <p className={styles.count}>
            <strong>{stats.total}</strong> Since {Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(stats.userCreatedAt))}
          </p>
        </>}
      </main>
      <footer className={styles.footer}>
        All users smoked 
        {' '}
        <strong>{stats.allUsersToday}</strong> 
        {' '}
        <ChangeIndicator change={stats.allUsersToday - stats.allUsersYesterday} />
        {' '}
        cigarettes today
      </footer>
    </div>
  )
}
