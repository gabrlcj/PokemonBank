import { useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import styles from './style.module.scss'

type MultiRangeSliderProps = {
  min: number
  max: number
  onChange: Function
}

export function MultiRangeSlider({
  min,
  max,
  onChange,
}: MultiRangeSliderProps) {
  const [minValue, setMinValue] = useState(min)
  const [maxValue, setMaxValue] = useState(max)

  const minValueRef = useRef<HTMLInputElement>(null)
  const maxValueRef = useRef<HTMLInputElement>(null)
  const rangeRef = useRef<HTMLDivElement>(null)

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  // Controle do preenchimento do input na parte esquerda
  useEffect(() => {
    if (maxValueRef.current) {
      const minPercent = getPercent(minValue)
      const maxPercent = getPercent(+maxValueRef.current.value) // '+' é para transformar ele de string para number

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`
        rangeRef.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [minValue, getPercent])

  // Controle do preenchimento do input na parte direita
  useEffect(() => {
    if (minValueRef.current) {
      const minPercent = getPercent(+minValueRef.current.value)
      const maxPercent = getPercent(maxValue)

      if (rangeRef.current) {
        rangeRef.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [maxValue, getPercent])

  // Pegar o valor min e max quando o estado deles alterar
  useEffect(() => {
    onChange({ min: minValue, max: maxValue })
  }, [minValue, maxValue, onChange])

  return (
    <div className={styles.inputRangeContainer}>
      <input
        className={classnames(styles.thumb, styles.thumbIndex4, {
          thumbIndex5: minValue > max - 100,
        })}
        type='range'
        min={min}
        max={max}
        value={minValue}
        ref={minValueRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxValue)
          setMinValue(value)
          event.target.value = value.toString()
        }}
      />
      <input
        className={(styles.thumb, styles.thumbIndex4)}
        type='range'
        min={min}
        max={max}
        value={maxValue}
        ref={maxValueRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minValue)
          setMaxValue(value)
          event.target.value = value.toString()
        }}
      />
      <div className={styles.slider}>
        <div className={styles.sliderTrack} />
        <div ref={rangeRef} className={styles.sliderRange} />
        <div className={styles.sliderLeftValue}>{minValue}</div>
        <div className={styles.sliderRightValue}>{maxValue}</div>
      </div>
    </div>
  )
}
