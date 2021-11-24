import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'


function RenderCards(props) {
  if (!props.cards || props.cards.length == 0) return null

  return (
    <>
      {props.cards.map(card => (
        <article key={card.id} className={styles.card}>
          <h1>{card.title}</h1>
          <div className={styles.description}>
            <p>{card.description}</p>
          </div>
        </article>
      ))}
    </>
  )
}

function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Faster Local Development with Lando</title>
        <meta name="description" content="Faster Local Development with Lando" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to some articles!
        </h1>

        <nav>
          <Link href='/'>
            <a>Home</a>
          </Link>
          <Link href='/search'>
            <a>Search</a>
          </Link>
        </nav>

        <div className={styles.grid}>
          <RenderCards cards={props.data} />
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/articles`).then(response => {
    return response.json()
  }).then(data => {
    return data // do some manipulation
  })

  return {
    props: {
      data: data
    },
  }
}


export default Home
