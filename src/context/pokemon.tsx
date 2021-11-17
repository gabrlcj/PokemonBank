import { createContext, useEffect, useState, ReactNode } from 'react'
import { api } from '../service/api'

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

type PokeContext = {
  pokemonData: PokemonData[]
  getAllPokemon: () => Promise<void>
  sortOpen: boolean
  handleSortOpen: () => void
  generationOpen: boolean
  handleGenerationOpen: () => void
  filterOpen: boolean
  handleFilterOpen: () => void
}

export const PokemonContext = createContext<PokeContext>({} as PokeContext)

type PokemonResults = {
  name: string
  url: string
}

type ProviderProps = {
  children: ReactNode
}

export function PokemonProvider({ children }: ProviderProps) {
  const [generationOpen, setGenerationOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const handleGenerationOpen = () => setGenerationOpen(!generationOpen)
  const handleSortOpen = () => setSortOpen(!sortOpen)
  const handleFilterOpen = () => setFilterOpen(!filterOpen)

  const [pokemonData, setPokemonData] = useState<PokemonData[]>([])
  const [loadMore, setLoadMore] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=50'
  )

  useEffect(() => {
    getAllPokemon()
  }, [])

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
    pokemonData?.sort(function (a, b) {
      if (a.id > b.id) return 1
      if (a.id < b.id) return -1
      return 0
    })
  }

  order(pokemonData)

  return (
    <PokemonContext.Provider
      value={{
        pokemonData,
        getAllPokemon,
        sortOpen,
        handleSortOpen,
        generationOpen,
        handleGenerationOpen,
        filterOpen,
        handleFilterOpen,
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}
