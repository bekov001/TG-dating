import React from 'react'
import styles from "./dots.module.css"

interface IDots {
    current: number,
    length: number
}

export default function Dots({current, length}: IDots) {
  return (
    <div className={styles.dots}>
         {[...Array(length)].map((x, i) => 
            <div key={i} className={i === current ? styles.active : styles.not}></div>
    
  )}
    </div>
  )
}
