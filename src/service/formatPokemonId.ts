interface PokemonData {
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
    1?: {
      type: {
        name: string
      }
    }
  }
}

type PokemonId = Pick<PokemonData, 'id'>

export function formatPokemonId(pokemon: PokemonId) {
  if (pokemon.id < 10) {
    return `00${pokemon.id}`
  } else if (pokemon.id < 100) {
    return `0${pokemon.id}`
  } else {
    return pokemon.id
  }
}
