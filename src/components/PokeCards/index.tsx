import { formatPokemonId } from '../../service/formatPokemonId'
import styles from './style.module.scss'

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

type PokeCardsProps = {
  pokemon: PokemonData
}

export function PokeCards({ pokemon }: PokeCardsProps) {
  const style = `${styles.pokeCard} ${pokemon.types[0].type.name}`

  const pokemonType1 = `${styles.pokemonType} ${pokemon.types[0].type.name}Type`
  const pokemonType2 = `${styles.pokemonType} ${pokemon.types[1]?.type.name}Type`

  return (
    <li className={style} key={Math.random()}>
      <div className={styles.textContainer}>
        <small className={styles.pokemonId}>#{formatPokemonId(pokemon)}</small>
        <h2 className={styles.pokemonName}>{pokemon.name}</h2>
        <div className={styles.pokemonTypesContainer}>
          <div className={pokemonType1}>
            <img
              src={
                pokemon.types[0].type.name
                  ? `assets/pkm-types/${pokemon.types[0].type.name}.svg`
                  : ''
              }
              alt={pokemon.types[0].type.name}
              title={pokemon.types[0].type.name}
            />
            <p>{pokemon.types[0].type.name}</p>
          </div>
          <div className={pokemonType2}>
            <img
              src={
                pokemon.types[1]?.type.name
                  ? `assets/pkm-types/${pokemon.types[1]?.type.name}.svg`
                  : ''
              }
              alt={pokemon.types[1]?.type.name}
              title={pokemon.types[1]?.type.name}
            />
            <p>{pokemon.types[1]?.type.name}</p>
          </div>
        </div>
      </div>
      <div className={styles.pokemonImage}>
        <img
          className={styles.pokeImage}
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          title={pokemon.name.toUpperCase()}
        />
      </div>
    </li>
  )
}
