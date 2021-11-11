import { useContext } from 'react'
import { PokemonContext } from '../../context/pokemon'
import { PokeCards } from '../../components/PokeCards'
import { ModalSort } from '../../components/ModalSort'
import { ModalFilters } from '../../components/ModalFilters'
import { ModalGeneration } from '../../components/ModalGeneration'
import HeaderFilters from '../../components/HeaderFilters'

import styles from './style.module.scss'

export function Home() {
  const { pokemonData, getAllPokemon } = useContext(PokemonContext)

  return (
    <>
      <HeaderFilters />
      <h1>Pokémon Bank</h1>
      <p>Search for Pokémon by name or using the National Pokédex number.</p>
      <label htmlFor='search'>
        <input
          className={styles.searchInput}
          type='search'
          name='search'
          placeholder='What Pokémon are you looking for?'
        />
      </label>
      <ul>
        {pokemonData?.map((pokemon) => (
          <PokeCards key={Math.random()} pokemon={pokemon} />
        ))}
      </ul>
      <div className={styles.loadMoreButton}>
        <button type='button' onClick={() => getAllPokemon()}>
          Load More!
        </button>
      </div>
      <ModalSort />
      <ModalGeneration />
      <ModalFilters />
    </>
  )
}
