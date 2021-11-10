import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { api } from '../../service/api'

type PokemonAbout = {}

export function PokemonAbout() {
  const [pokemon, setPokemon] = useState([])
  const { name } = useParams()

  useEffect(() => {
    async function handlePokemonAbout() {
      const res = await api.get(`pokemon/${name}`)
      setPokemon(res.data)
    }
    handlePokemonAbout()
  }, [name])

  if (!pokemon) return

  return <h1>Data</h1>
}
