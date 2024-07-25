import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./main_c.module.css";


type PropType = {
    slides: number[]
    options?: EmblaOptionsType
  }
  
export const MainCarousel: React.FC<PropType> = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i: number) => (
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "30px",
            color: "blue",
            border: "1px blue solid"
          }}
        >
          {i + 1}
        </div>
      )
  };
  return (
    <Slider {...settings}>
      <div className={styles.photo}>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      
    </Slider>
  );
}