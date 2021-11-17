import { useEffect, useState } from 'react'
import { api } from '../../service/api'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { Loading } from '../../components/Loading'
import { PokeCardsDetails } from '../../components/PokeCardsDetails'

import backImg from '/assets/icons/back.svg'
import styles from './style.module.scss'

type PokemonAbout = {
  id: number
  name: string
  height: number
  weight: number
  abilities: {
    0: {
      ability: {
        name: string
      }
      is_hidden: boolean
    }
    1: {
      ability: {
        name: string
      }
      is_hidden: boolean
    }
  }
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

export function PokemonAbout() {
  const [pokemon, setPokemon] = useState<PokemonAbout[]>([])
  const [loading, setLoading] = useState(false)
  const { name } = useParams()

  useEffect(() => {
    setLoading(true)
    async function handlePokemonAbout() {
      const res = await api.get(`pokemon/${name}`)
      setPokemon((prevState) => [...prevState, res.data])
      setLoading(false)
    }
    handlePokemonAbout()
  }, [name])

  return (
    <section>
      {loading ? (
        <Loading />
      ) : (
        <>
          <button type='button' className={styles.buttonBack}>
            <Link to='/'>
              <img src={backImg} alt='Go back icon' />
            </Link>
          </button>
          <PokeCardsDetails pokemonDetails={pokemon} />
        </>
      )}
    </section>
  )
}
