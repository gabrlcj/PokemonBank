import { useEffect, useState } from 'react'
import { api } from '../../service/api'
import { HeaderFilters } from '../../components/HeaderFilters'

import searchImg from '/assets/icons/search.svg'
import styles from './style.module.scss'
import { PokeCards } from '../../components/PokeCards'

type PokemonResults = {
  name: string
  url: string
}

type PokemonData = {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    other: {
      home: {
        front_default: string
      }
    }
  }
}

export function Home() {
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([])
  const [loadMore, setLoadMore] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=20'
  )

  const getAllPokemon = async () => {
    const res = await api.get(loadMore)
    setLoadMore(res.data.next)

    function createPokemonObject(result: PokemonResults[]) {
      result.forEach(async (pokemon) => {
        const res = await api.get(`pokemon/${pokemon.name}`)
        setPokemonData((currentList) => [...currentList, res.data])
      })
    }
    createPokemonObject(res.data.results)
    await console.log(pokemonData)
  }

  function order(pokemonData: PokemonData[]) {
    pokemonData.sort(function (a, b) {
      if (a.id > b.id) return 1
      if (a.id < b.id) return -1
      return 0
    })
  }

  useEffect(() => {
    getAllPokemon()
  }, [])

  order(pokemonData)

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
      <button type='button' onClick={() => getAllPokemon()}>
        Load More!
      </button>
    </>
  )
}
