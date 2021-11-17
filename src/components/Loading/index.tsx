import styles from './style.module.scss'

export function Loading() {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.loader}></span>
      <h3>Loading...</h3>
    </div>
  )
}
