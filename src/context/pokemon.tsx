import { createContext, useEffect, useState, ReactNode } from 'react'
import { api } from '../service/api'

interface PokeContext {
  pokemonData: PokemonData[]
  getAllPokemon: () => void
}

type PokemonData = {
  id: number
  name: string
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: {
    0: {
      type: {
        name: string
      }
    }
    1: {
      type: {
        name: string
      }
    }
  }
}

type PokemonResults = {
  name: string
  url: string
}

type ProviderProps = {
  children: ReactNode
}

export const PokemonContext = createContext<PokeContext>({} as PokeContext)

export function PokemonProvider({ children }: ProviderProps) {
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
        setPokemonData((prevState) => [...prevState, res.data])
      })
    }
    createPokemonObject(res.data.results)
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
    <PokemonContext.Provider value={{ pokemonData, getAllPokemon }}>
      {children}
    </PokemonContext.Provider>
  )
}
