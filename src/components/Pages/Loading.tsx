import React from 'react'
import styles from "./loading.module.css"
import { useDrag } from '@use-gesture/react';
interface IL {
  platform: string,
}


export default function Loading({platform} : IL) {
  function open(link: string) {
    window.open(link, "_blank")
}


const bind = useDrag(state => {
  const {
    swipe,         // [swipeX, swipeY] 0 if no swipe detected, -1 or 1 otherwise
    tap,   // is the drag assimilated to a tap
    xy: [x, y]         
  } = state

 
})
  return (
    <div className={styles.back}  {...bind()}>
      <div className={styles.main}>
        {/* <div className={styles.title}>BeeApp</div> */}
      <img className={styles.bee} src="img/fire.png"></img>
      <div className={styles.label}>MATCH</div>
      {/* <p>Platform: {platform}</p> */}
        {/* <div className={styles.media}> */}
        {/* <div className={styles.telegram} style={{ WebkitTapHighlightColor: 'transparent' }} onClick={() => open("https://t.me/Bee_Apps")}><img  src="images/telegram.png"></img></div>

        <div  style={{ WebkitTapHighlightColor: 'transparent' }} onClick={() => open("https://vk.com")}><img  src="images/x.png"></img></div> */}
      {/* </div> */}
      

        </div>
    </div>
  )
}