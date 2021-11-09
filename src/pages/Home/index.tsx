import { HeaderFilters } from '../../components/HeaderFilters'

import searchImg from '/assets/icons/search.svg'
import styles from './style.module.scss'
import { PokeCards } from '../../components/PokeCards'
import { useContext } from 'react'
import { PokemonContext } from '../../context/pokemon'

export function Home() {
  const { pokemonData, getAllPokemon } = useContext(PokemonContext)

  return (
    <>
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
      {pokemonData.map((pokemon) => (
        <PokeCards key={Math.random()} pokemon={pokemon} />
      ))}
      <div className={styles.loadMoreButton}>
        <button type='button' onClick={() => getAllPokemon()}>
          Load More!
        </button>
      </div>
    </>
  )
}
