import React from 'react'
import styles from "./empty.module.css"

interface IEmpty{

    image: string
}
export default function ({image}: IEmpty) {
  return (
    <div className={styles.con}>
        <img className={styles.pic}src={"data:image/png;base64," + image}></img>
        
        <p className={styles.end}>Анкеты кончились</p>
    </div>
  )
}
