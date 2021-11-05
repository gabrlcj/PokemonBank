import generationImg from '/assets/icons/generation.svg'
import sortImg from '/assets/icons/sort.svg'
import filterImg from '/assets/icons/filter.svg'

import styles from './style.module.scss'

export function HeaderFilters() {
  return (
    <header className={styles.headerIcons}>
      <div>
        <img src={generationImg} alt='Generation icon' />
        <img src={sortImg} alt='Sort icon' />
        <img src={filterImg} alt='Filter icon' />
      </div>
    </header>
  )
}
