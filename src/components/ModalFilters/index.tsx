import { useContext, useRef, useState } from 'react'
import { PokemonContext } from '../../context/pokemon'
import { useClickOutside } from '../../hooks/useClickOutside'
import { pokemonTypes } from '../../utils/pokemonTypes'
import { MultiRangeSlider } from '../MultiRangeSlider'
import styles from './style.module.scss'

const pokemonHeights = [{ size: 'short' }, { size: 'medium' }, { size: 'tall' }]
const pokemonWeights = [
  { heaviness: 'light' },
  { heaviness: 'normal' },
  { heaviness: 'heavy' },
]

export function ModalFilters() {
  const { filterOpen, handleFilterOpen } = useContext(PokemonContext)
  const [valueType, setValueType] = useState('')
  const [valueWeakness, setValueWeakness] = useState('')
  const [valueHeight, setValueHeight] = useState('')
  const [valueWeight, setValueWeight] = useState('')
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(0)

  const ref = useRef(null)
  const handleClickOutside = () => {
    handleFilterOpen()
  }
  useClickOutside(ref, handleClickOutside)

  const handleResetFilters = () => {
    setValueType('')
    setValueWeakness('')
    setValueHeight('')
    setValueWeight('')
  }

  return (
    <div className={`react-modal-overlay ${filterOpen ? 'active' : ''}`}>
      {filterOpen && (
        <section
          ref={ref}
          className={`${styles.modalContainer} react-modal-content`}
        >
          <h2>Filters</h2>
          <p>
            Use advanced search to explore Pokémon by type, weakness, height and
            more!
          </p>
          <h3>Types</h3>
          <div className={styles.pokemonInputsContainer}>
            {pokemonTypes.map((types) => (
              <div
                key={types.name}
                className={
                  types.name === valueType
                    ? `${types.name}Type`
                    : `${types.name}Icon`
                }
              >
                <img
                  className={`${types.name}TypeFilter`}
                  src={`assets/pkm-types/${types.name}.svg`}
                  alt='Pokemon types'
                  title={types.name}
                />
                <input
                  type='checkbox'
                  name={types.name}
                  value={types.name}
                  onChange={(e) => setValueType(e.target.value)}
                />
                <label htmlFor={types.name} />
              </div>
            ))}
          </div>
          <h3>Weaknesses</h3>
          <div className={styles.pokemonInputsContainer}>
            {pokemonTypes.map((types) => (
              <div
                key={types.name}
                className={
                  types.name === valueWeakness
                    ? `${types.name}Type`
                    : `${types.name}Icon`
                }
              >
                <img
                  className={`${types.name}TypeFilter`}
                  src={`assets/pkm-types/${types.name}.svg`}
                  alt='Pokemon types'
                  title={types.name}
                />
                <input
                  type='checkbox'
                  name={types.name}
                  value={types.name}
                  onChange={(e) => setValueWeakness(e.target.value)}
                />
                <label htmlFor={types.name} />
              </div>
            ))}
          </div>
          <h3>Heights</h3>
          <div className={styles.pokemonInputsContainer}>
            {pokemonHeights.map((height) => (
              <div
                key={height.size}
                className={
                  height.size === valueHeight
                    ? `${height.size}Height`
                    : `${height.size}HeightIcon`
                }
              >
                <img
                  className={`${height.size}TypeFilter`}
                  src={`assets/heights/${height.size}.svg`}
                  alt={height.size}
                  title={height.size}
                />
                <input
                  type='checkbox'
                  name={height.size}
                  value={height.size}
                  onChange={(e) => setValueHeight(e.target.value)}
                />
                <label htmlFor={height.size} />
              </div>
            ))}
          </div>
          <h3>Weights</h3>
          <div className={styles.pokemonInputsContainer}>
            {pokemonWeights.map((weight) => (
              <div
                key={weight.heaviness}
                className={
                  weight.heaviness === valueWeight
                    ? `${weight.heaviness}Weight`
                    : `${weight.heaviness}WeightIcon`
                }
              >
                <img
                  className={`${weight.heaviness}TypeFilter`}
                  src={`assets/weights/${weight.heaviness}.svg`}
                  alt={weight.heaviness}
                  title={weight.heaviness}
                />
                <input
                  type='checkbox'
                  name={weight.heaviness}
                  value={weight.heaviness}
                  onChange={(e) => setValueWeight(e.target.value)}
                />
                <label htmlFor={weight.heaviness} />
              </div>
            ))}
          </div>
          <h3>Number Range</h3>
          <MultiRangeSlider
            min={1}
            max={1118}
            onChange={({ min, max }: { min: number; max: number }) => {
              setOffset(min)
              setLimit(max)
            }}
          />
          <div className={styles.buttonContainer}>
            <button type='button' onClick={handleResetFilters}>
              Reset
            </button>
            <button type='button'>Apply</button>
          </div>
        </section>
      )}
    </div>
  )
}
