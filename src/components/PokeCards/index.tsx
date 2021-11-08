import styles from './style.module.scss'

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

type PokeCardsProps = {
  pokemon: PokemonData
}

export function PokeCards({ pokemon }: PokeCardsProps) {
  // const style = `color bg per type`

  return (
    <li className={styles.pokeCard} key={Math.random()}>
      <small>#{pokemon.id}</small>
      <strong>{pokemon.name}</strong>
      <p>{pokemon.height}</p>
      <p>{pokemon.weight}</p>
      <img
        className={styles.pokeImage}
        src={pokemon.sprites.other.home.front_default}
        alt={pokemon.name}
      />
    </li>
  )
}
