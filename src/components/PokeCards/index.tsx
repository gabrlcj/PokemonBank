import { useContext } from 'react'
import { PokemonContext } from '../../context/pokemon'
import { formatPokemonId } from '../../utils/formatPokemonId'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

export function PokeCards() {
  const { pokemonData } = useContext(PokemonContext)

  if (pokemonData === undefined)
    return <h1>Something went wrong, please reload the page</h1>

  return (
    <ul>
      {pokemonData.map((pokemon) => (
        <Link
          style={{ textDecoration: 'none' }}
          key={Math.random()}
          to={`pokemon/${pokemon.name}`}
        >
          <li className={`${styles.pokeCard} ${pokemon.types[0].type.name}`}>
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
                        ? `assets/pkm-types/${pokemon.types[0].type.name}.svg`
                        : ''
                    }
                    alt={pokemon.types[0].type.name}
                    title={pokemon.types[0].type.name}
                  />
                  <p>{pokemon.types[0].type.name}</p>
                </div>
                <div
                  className={`${styles.pokemonType} ${pokemon.types[1]?.type.name}Type`}
                >
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
        </Link>
      ))}
    </ul>
  )
}
