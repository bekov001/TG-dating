import React, { useEffect, useState } from 'react';
import styles from "./main_c.module.css"
import { useDrag } from '@use-gesture/react';
import Dots from './Dots';

interface IImages{
  slides: any, 
  person: any,
  currentIndex: number,
  setCurrentIndex: any
}
const ImageSlider = ({ slides, person, currentIndex, setCurrentIndex }: IImages) => {
  

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex - 1 + slides.length) % slides.length);
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
    else if (tap){
        handleNextSlide()
    }
    if (swipe[0] === -1){
        handleNextSlide()
    }
   
  })

  // const images = []

  

  return (
    <div className={styles.slider_container} {...bind()}>
        
      {<div className={styles.slide}>
        {slides.length > 1 ? <Dots length={slides.length} current={currentIndex}></Dots>: ""}
        {slides.map((
            el: string, id: number
        ) => {
          
            return <img key={id} src={el} className={styles.image} style={{display: (id === currentIndex ? "block": "none")}}></img>
        })}
      {/* {[<img src={"img/image.png"}className={styles.image}></img>, <img src={"img/girl.jpg"}className={styles.image}></img>, <img src={"img/image.png"}className={styles.image}></img>][currentIndex]} */}
      <div className={styles.title}>
        {person.liked && <p className={styles.liked}>Этот пользователь поставил тебе лайк!</p>}
      <p className={styles.name}>{person.name}, {person.age}</p>
      <div className={styles.desc_}><img src="img/location.svg"></img><p className={styles.desc}>{person.city}</p></div>
    </div>
      
      <div className={styles.dark}></div></div>}
     
    </div>
  );
};

export default ImageSlider;
