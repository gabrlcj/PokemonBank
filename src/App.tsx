import { HeaderFilters } from './components/HeaderFilters'
import searchImg from '/assets/icons/search.svg'
import styles from './App.module.scss'

export function App() {
  return (
    <main className={styles.container}>
      <HeaderFilters />
      <h1>Pokémon Bank</h1>
      <p>Search for Pokémon by name or using the National Pokédex number.</p>
      <label className={styles.searchContainer} htmlFor='search'>
        <img src={searchImg} alt='Search icon' />
        <input
          className={styles.searchInput}
          type='search'
          name='search'
          placeholder='What Pokémon are you looking for?'
        />
      </label>
    </main>
  )
}
