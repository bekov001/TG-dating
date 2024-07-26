import React, { useState } from 'react';
import styles from "./main_c.module.css"
import { useDrag } from '@use-gesture/react';
import Dots from './Dots';


const ImageSlider = ({ slides }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const bind = useDrag(state => {
    const {
      swipe,         // [swipeX, swipeY] 0 if no swipe detected, -1 or 1 otherwise
      tap,   // is the drag assimilated to a tap
      xy: [x, y]         
    } = state
    console.log(swipe)
    if (swipe[0] === 1){
        handlePrevSlide()
    }
    if (swipe[0] === -1){
        handleNextSlide()
    }
   
  })

  const currentSlide = slides[currentIndex];

  return (
    <div className={styles.slider_container} {...bind()}>
        
      {<div className={styles.slide}>
        <Dots length={2} current={currentIndex}></Dots>
      {[<img src={"img/image.png"}className={styles.image}></img>, <img src={"img/girl.jpg"}className={styles.image}></img>, <img src={"img/image.png"}className={styles.image}></img>][currentIndex]}
      <div className={styles.title}>
      <p className={styles.name}>Алиса, 19</p>
      <div className={styles.desc_}><img src="img/location.svg"></img><p className={styles.desc}>Москва</p></div>
    </div>
      
      <div className={styles.dark}></div></div>}
     
    </div>
  );
};

export default ImageSlider;
