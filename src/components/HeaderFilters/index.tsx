import generationImg from '/assets/icons/generation.svg'
import sortImg from '/assets/icons/sort.svg'
import filterImg from '/assets/icons/filter.svg'

import styles from './style.module.scss'
import { useContext } from 'react'
import { PokemonContext } from '../../context/pokemon'

export default function HeaderFilters() {
  const { handleSortOpen } = useContext(PokemonContext)
  return (
    <header className={styles.headerIcons}>
      <div className={styles.filterButtons}>
        <button type='button'>
          <img src={generationImg} alt='Generation icon' />
        </button>
        <button type='button' onClick={handleSortOpen}>
          <img src={sortImg} alt='Sort icon' />
        </button>
        <button type='button'>
          <img src={filterImg} alt='Filter icon' />
        </button>
      </div>
    </header>
  )
}
