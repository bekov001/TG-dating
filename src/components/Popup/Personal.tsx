import React, { useState } from 'react'
import styles from "./personal.module.css"


interface IFilter {
    cancel: () => void,
    info: string
}
export default function Personal({cancel, info}: IFilter) {

    // const [values, setValues] = React.useState([18, 80]);
    return (
        <div>
        <div className={styles.filter} onClick={() => cancel()}></div>
        <div className={styles.main}>
            <div className={styles.section}>
            
            <p className={styles.name}>Алиса, 19</p>
            <div className={styles.place}><img src="img/location.svg"></img><p className={styles.desc}>Москва</p></div>
            </div>
            {/* <div onClick={() => cancel()}  className={styles.close} style={{ WebkitTapHighlightColor: 'transparent' }}><img src={"images/close.png"}  alt="logo"  /></div> */}
         
            <div style={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: "center", marginTop: "15px"}}>
            <div className={styles.text}>{info.length > 0 ? info: "Пользователь пока не рассказал о себе."}</div>
            
              </div></div>
        

    </div>
      )
}
