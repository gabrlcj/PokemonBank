import { useContext, useRef, useState } from 'react'
import { PokemonContext } from '../../context/pokemon'
import { useClickOutside } from '../../hooks/useClickOutside'
import { pokemonGenerations } from '../../utils/pokemonGenerations'

import styles from './style.module.scss'

export function ModalGeneration() {
  const { generationOpen, handleGenerationOpen } = useContext(PokemonContext)
  const [isActive, setIsActive] = useState(0)

  const ref = useRef(null)
  const handleClickOutside = () => {
    handleGenerationOpen()
  }
  useClickOutside(ref, handleClickOutside)

  return (
    <div className={`react-modal-overlay ${generationOpen ? 'active' : ''}`}>
      {generationOpen && (
        <section
          ref={ref}
          className={`react-modal-content ${styles.modalContainer}`}
        >
          <h2>Generation</h2>
          <p>Use search for generations to explore your Pokémon!</p>
          <div className={styles.buttonContainer}>
            {pokemonGenerations.map((gen, index) => (
              <button
                key={Math.random()}
                type='button'
                className={index === isActive ? styles.active : styles.inactive}
                onClick={() => setIsActive(index)}
              >
                <div className={styles.generationContainer}>
                  <img
                    src={`assets/generations/${gen.generation.name}/${gen.generation.starters.grass}.png`}
                    alt='Grass Starter'
                  />
                  <img
                    src={`assets/generations/${gen.generation.name}/${gen.generation.starters.fire}.png`}
                    alt='Fire Starter'
                  />
                  <img
                    src={`assets/generations/${gen.generation.name}/${gen.generation.starters.water}.png`}
                    alt='Water Starter'
                  />
                </div>
                {gen.generation.title}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
