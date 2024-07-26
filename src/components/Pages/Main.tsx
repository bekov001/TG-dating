import React from 'react'
import MainCarousel from '../UI/MainCarousel.tsx'
import styles from "./main.module.css"
import Header from '../UI/Header.tsx'


export default function Main() {
    const OPTIONS = {}
    const SLIDE_COUNT = 2
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  return (
    <div className={styles.back}>
        <div className={styles.main}>
        <Header></Header>
        <MainCarousel slides={SLIDES}></MainCarousel>
        <div className={styles.buttons}>
        <button className={styles.return}><img src={"img/undo.svg"}></img></button>
        <button className={styles.close}><img src={"img/dislike.svg"}></img></button>
        
        <button className={styles.close}><img src={"img/heart.svg"}></img></button>
        <button className={styles.return}><img src={"img/personalcard.svg"}></img></button>
        </div>
        
        </div>
        </div>
  )
}
