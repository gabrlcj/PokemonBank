import { FormEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PokemonContext } from '../../context/pokemon'
import { PokeCards } from '../../components/PokeCards'
import { ModalSort } from '../../components/ModalSort'
import { ModalFilters } from '../../components/ModalFilters'
import { ModalGeneration } from '../../components/ModalGeneration'
import HeaderFilters from '../../components/HeaderFilters'

import styles from './style.module.scss'
import { api } from '../../service/api'
import { Loading } from '../../components/Loading'

export function Home() {
  const { pokemonData, getAllPokemon, loading } = useContext(PokemonContext)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    const res = await api.get(`pokemon/${search}`)
    if (res.status === 404) {
      navigate('/')
    } else {
      navigate(`pokemon/${search}`)
    }
  }

  return (
    <main>
      <HeaderFilters />
      <h1>Pokémon Bank</h1>
      <p>Search for Pokémon by name or using the National Pokédex number.</p>
      <form className={styles.searchContainer} onSubmit={onSubmitHandler}>
        <input
          className={styles.searchInput}
          type='text'
          name='text'
          placeholder='What Pokémon are you looking for?'
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor='text' />
        <button type='submit'>Search</button>
      </form>
      <PokeCards pokemonData={pokemonData} />
      <div className={styles.loadMoreButton}>
        <button type='button' onClick={() => getAllPokemon()}>
          {loading ? <Loading /> : 'Load More!'}
        </button>
      </div>
      <ModalSort />
      <ModalGeneration />
      <ModalFilters />
    </main>
  )
}
