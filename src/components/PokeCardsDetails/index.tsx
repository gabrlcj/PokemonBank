import { formatPokemonId } from '../../utils/formatPokemonId'
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

type PokeCardsDetailsProps = {
  pokemonDetails: PokemonAbout[]
}

export function PokeCardsDetails({ pokemonDetails }: PokeCardsDetailsProps) {
  return (
    <>
      {pokemonDetails.map((pokemon) => (
        <li
          key={pokemon.id}
          className={`${styles.pokeCardDetails} ${pokemon.types[0].type.name}`}
        >
          <div className={styles.textContainer}>
            <small className={styles.pokemonId}>
              #{formatPokemonId(pokemon)}
            </small>
            <h2 className={styles.pokemonName}>{pokemon.name}</h2>
            <div className={styles.pokemonTypesContainer}>
              <div
                className={`${styles.pokemonType} ${pokemon.types[0].type.name}Type`}
              >
                <img
                  src={
                    pokemon.types[0].type.name
                      ? `/assets/pkm-types/${pokemon.types[0].type.name}.svg`
                      : ''
                  }
                  alt={pokemon.types[0].type.name}
                  title={pokemon.types[0].type.name}
                />
                <p>{pokemon.types[0].type.name}</p>
              </div>
              {pokemon.types[1]?.type.name && (
                <div
                  className={`${styles.pokemonType} ${pokemon.types[1]?.type.name}Type`}
                >
                  <img
                    src={
                      pokemon.types[1]?.type.name
                        ? `/assets/pkm-types/${pokemon.types[1]?.type.name}.svg`
                        : ''
                    }
                    alt={pokemon.types[1]?.type.name}
                    title={pokemon.types[1]?.type.name}
                  />
                  <p>{pokemon.types[1]?.type.name}</p>
                </div>
              )}
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
          <div className={styles.pokemonMeasure}>
            <h3 className={styles.pokemonName}>
              Weight: {`${pokemon.weight} lbs`}
            </h3>
            <h3 className={styles.pokemonName}>
              Height: {`${pokemon.height} ft`}
            </h3>
          </div>
        </li>
      ))}
    </>
  )
}
