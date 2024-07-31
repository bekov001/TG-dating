import React, { useState } from 'react'
import styles from "./filter.module.css"
import { getTrackBackground, Range, } from "react-range";
import FilterRange from '../UI/FilterRange';
import { client } from '../../socket';

interface IFilter {
    cancel: () => void,
    age: number[],
    submit: (value: number[]) => void
}
export default function Filter({cancel, age, submit}: IFilter) {

    const [values, setValues] = React.useState(age);

   

    return (
        <div>
        <div className={styles.filter} onClick={() => cancel()}></div>
        <div className={styles.main}>
            <div className={styles.section}>
            
            <p className={styles.name}>Возраст поиска:</p>
            <p className={styles.name}>{values[0]} - {values[1]}</p>
            </div>
            {/* <div onClick={() => cancel()}  className={styles.close} style={{ WebkitTapHighlightColor: 'transparent' }}><img src={"images/close.png"}  alt="logo"  /></div> */}
         
            <FilterRange values={values} setValues={setValues}></FilterRange>
            <div style={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: "center", marginTop: "15px"}}>
            <div className={styles.subscribe} onClick={() => {submit(values); cancel()}} >Готово</div>
            
            
              </div></div>
        

    </div>
      )
}
