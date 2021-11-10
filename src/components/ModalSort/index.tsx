import { useContext, useRef } from 'react'
import { PokemonContext } from '../../context/pokemon'
import { useClickOutside } from '../../hooks/useClickOutside'

export function ModalSort() {
  const { sortOpen, handleSortOpen } = useContext(PokemonContext)
  const ref = useRef(null)

  const handleClickOutside = () => {
    handleSortOpen()
  }

  useClickOutside(ref, handleClickOutside)

  return (
    <section className={`react-modal-overlay ${sortOpen ? 'active' : ''}`}>
      {sortOpen && (
        <div ref={ref} className='react-modal-content'>
          <h2>Sort</h2>
        </div>
      )}
    </section>
  )
}
