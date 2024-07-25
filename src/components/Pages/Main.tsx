import React from 'react'
import {MainCarousel} from '../UI/MainCarousel.tsx'
import styles from "./main.module.css"


export default function Main() {
    const OPTIONS = {}
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  return (
    <div className={styles.back}>
        <div className={styles.main}>
        <MainCarousel slides={SLIDES}></MainCarousel>
        </div>
        </div>
  )
}
