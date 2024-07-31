import React from 'react'
import styles from "./loading.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.gay}>
    <div className={styles.loader}></div>
    </div>
  )
}
