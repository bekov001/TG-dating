import React from 'react'
import styles from "./header.module.css"


export default function Header() {
  return (
    <div className={styles.header}>
        <div className={styles.profile}><img src='img/place.png' ></img><p className={styles.name}>Михаил З.</p></div>
        <img className={styles.filter} src="img/Settings.svg"></img>
    </div>
  )
}
