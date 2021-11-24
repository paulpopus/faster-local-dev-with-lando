import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { InstantSearch, connectHits, connectSearchBox } from 'react-instantsearch-dom'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'


const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <form noValidate action="" role="search">
    <input
      type="search"
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
      autoCapitalize='off'
    />
    <button onClick={() => refine('')}>Reset query</button>
    {isSearchStalled ? 'My search is stalled' : ''}
  </form>
)

const CustomSearchBox = connectSearchBox(SearchBox)


const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_SEARCH_ENDPOINT,
  process.env.NEXT_PUBLIC_SEARCH_KEY
)

const CustomHits = ({hits}) => {
  return (
    <div className={styles.grid}>
      {hits.map(hit => (
        <article key={hit.id} className={styles.card}>
          <h1>{hit.title}</h1>
          <div className={styles.description}>
            <p>{hit.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

const SearchListings = connectHits(CustomHits)

function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Faster Local Development with Lando</title>
        <meta name="description" content="Faster Local Development with Lando" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Search some articles</h1>

        <nav>
          <Link href='/'>
            <a>Home</a>
          </Link>
          <Link href='/search'>
            <a>Search</a>
          </Link>
        </nav>

        <div>
          <InstantSearch
              indexName="article"
              searchClient={searchClient}
            >
            <CustomSearchBox />

            <SearchListings />

          </InstantSearch>
        </div>
      </main>
    </div>
  )
}


export default Home
