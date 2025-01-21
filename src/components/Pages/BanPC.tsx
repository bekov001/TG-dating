import React from 'react'
import styles from "./ban.module.css"
export default function BanPC() {
  return (

    <div className={styles.back}>
        <div className={styles.main}>
        <div className={styles.ban}>НЕ-А, ЗАХОДИ СО СМАРТФОНА</div>
            <img  className={styles.img} src="img/qr.png"/></div>
            <div className={styles.scan}>SCAN ME</div>
        </div>
  )
}
