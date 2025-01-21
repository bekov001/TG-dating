import React from 'react'
import styles from "./empty.module.css"

interface IEmpty{

    image: string
}
export default function ({image}: IEmpty) {
  return (
    <div className={styles.con}>
        <img className={styles.pic}src={"https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_3840,g_auto/f_auto/q_auto/shutterstock_2414539851_ss_non-editorial_dcx0bm?_a=BAVARSAP0"}></img>
        
        <p className={styles.end}>Анкеты кончились</p>
    </div>
  )
}
