import { useContext, useRef, useState } from 'react'
import { PokemonContext } from '../../context/pokemon'
import { useClickOutside } from '../../hooks/useClickOutside'
import styles from './style.module.scss'

const buttons = [
  { name: 'Smallest number first' },
  { name: 'Highest number first' },
  { name: 'A-Z' },
  { name: 'Z-A' },
]

export function ModalSort() {
  const { sortOpen, handleSortOpen } = useContext(PokemonContext)
  const [isActive, setIsActive] = useState(0)

  const ref = useRef(null)
  const handleClickOutside = () => {
    handleSortOpen()
  }
  useClickOutside(ref, handleClickOutside)

  return (
    <div className={`react-modal-overlay ${sortOpen ? 'active' : ''}`}>
      {sortOpen && (
        <section
          ref={ref}
          className={`${styles.modalContainer} react-modal-content`}
        >
          <h2>Sort</h2>
          <p>Sort Pokémon alphabetically or by National Pokédex number!</p>
          <div className={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <button
                key={Math.random()}
                type='button'
                className={index === isActive ? styles.active : styles.inactive}
                onClick={() => setIsActive(index)}
              >
                {button.name}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
