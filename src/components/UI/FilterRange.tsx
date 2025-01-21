import React from 'react'
import { getTrackBackground, Range } from 'react-range';
// import RangeSlider from 'react-range-slider-input';

interface IFilterRange {
    values: number[],
    setValues: (gay: any) => void
}
export default function FilterRange({values, setValues}: IFilterRange) {
    
    const STEP = 1;
    const MIN = 18;
    const MAX = 80;
    const rtl = false;

     

      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: '80vw'
          }}
        >
        
          <Range
            values={values}
            step={STEP}
            min={MIN}
            max={MAX}
            rtl={false}
            allowOverlap
            onChange={(values) => {
              if (Math.abs(values[1] - values[0]) >= 2 ) {
              setValues(values);
              }
            }}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "36px",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values,
                      colors: ["#ccc", "#F34D71", "#ccc"],
                      
                      min: MIN,
                      max: MAX,
                      rtl,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                key={props.key}
                style={{
                  ...props.style,
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  backgroundColor: "#F34D71",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <div
                  style={{
                    height: "16px",
                    width: "5px",
                    backgroundColor: isDragged ? "#F34D71" : "#F34D71",
                  }}
                /> */}
              </div>
            )}
          />
        </div>
      );
    };
    
