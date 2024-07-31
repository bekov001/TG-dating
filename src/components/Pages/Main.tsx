import React, { useEffect, useState } from 'react'
import MainCarousel from '../UI/MainCarousel.tsx'
import styles from "./main.module.css"
import Header from '../UI/Header.tsx'
import Filter from '../Popup/Filter.tsx'
import Personal from '../Popup/Personal.tsx'
import { useDrag } from '@use-gesture/react';
import useWebSocket from 'react-use-websocket'
import LoadingSpinner from '../UI/LoadingSpinner.tsx'
import Empty from '../UI/Empty.tsx'

export default function Main({user, age, changeFilter}: {user: any, age: number[], changeFilter: (value: number[]) => void}) {
    const OPTIONS = {}
    const SLIDE_COUNT = 2
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    const [showFilter, setShowFilter] = useState(false)
    const [showPersonal, setShowPersonal] = useState(false)
    const [personArray, setPersonArray] = useState([])
    const [empty, setEmpty] = useState(true)
    const [index, setIndex] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [person, setPerson] = useState({
      id: 0,
      age: 0,
      photos: [],
      description: ""
    })
    const bind = useDrag(state => {
        const {
          swipe,         // [swipeX, swipeY] 0 if no swipe detected, -1 or 1 otherwise
          tap,   // is the drag assimilated to a tap
          xy: [x, y]         
        } = state
        
       
      })
    
      
    function openFilter(){
        setShowFilter(true)
    }

    function closeFilter(){
        setShowFilter(false)
    }

    function openPersonal(){
        console.log('ejidje')
        setShowPersonal(true)
    }

    function like(){
      
      sendJsonMessage(({
        type: "like",
        form_id: person.id
       
    }));
    if (index + 1 < personArray.length){
      setCurrentIndex(0)
    setPerson(personArray[index + 1])
    setIndex(index + 1);
    } else {
      sendJsonMessage(({
      type: "get",
     
  }))}
  }

  function back(){
    
   
  if (index > 0){
    setCurrentIndex(0)
  setPerson(personArray[index - 1])
  setIndex(index - 1);
  } else {
  }
}

  

  function dislike(){
    // setCurrentIndex(0)
    sendJsonMessage(({
      type: "dislike",
      form_id: person.id
     
  }));
  if (index + 1 < personArray.length){
    setCurrentIndex(0)
  setPerson(personArray[index + 1])
  setIndex(index + 1);
  } else {
    sendJsonMessage(({
    type: "get",
   
}))}
}

    const { lastMessage, sendJsonMessage} = useWebSocket("wss://virusq.tech/dating_api/v1/user/form/ws", {
       onError: (e) => console.error('Error in websocket', e),
      onOpen: () => {
          try {
            sendJsonMessage(({
                  type: "auth",
                  access_token: localStorage.getItem('jwt')?.split(" ")[1]
              }));
              console.log(localStorage.getItem('jwt'))
            
          } catch (error) {
              console.error("WebSocket Error:", error); 
          }
      },
      onMessage: (e) => {
        // console.log("овтет")
          const data = JSON.parse(e.data);
          if (data.success && !data.forms){
            sendJsonMessage(({
              type: "get"
          }));
          } else if (data.forms) {
            setPersonArray(data.forms)
            setIndex(0)
            setPerson(data.forms[0])
            setEmpty(false)
          }  
          console.log(data)
          // setPerson(data)
      },
      shouldReconnect: (closeEvent) => true,
  });

    useEffect(() => {
      // if (lastMessage !== null) {
      //   setMessageHistory((prev) => prev.concat(lastMessage));
      // }
      console.log(lastMessage)
    }, [lastMessage]);

  return (
    <div className={styles.back} {...bind}>
        <div className={styles.main}>
        <Header user={user} open={openFilter} ></Header>
        {/* <LoadingSpinner></LoadingSpinner> */}
        {!empty ? <MainCarousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} person={person} slides={person.photos}></MainCarousel>: <Empty image={user.avatar}></Empty>}
       {!empty && <div className={styles.buttons}>
        <button className={styles.return} onClick={() => back()}><img src={"img/undo.svg"}></img></button>
        <button className={styles.close} onClick={() => dislike()}><img src={"img/dislike.svg"}></img></button>
        
        <button className={styles.close}  onClick={() => like()}><img src={"img/heart.svg"}></img></button>
        <button className={styles.return} onClick={() => openPersonal()}><img src={"img/personalcard.svg"}></img></button>
        </div>}
        
        </div>
        {showFilter ? <Filter submit={changeFilter} age={age} cancel={closeFilter}></Filter> : ""}
        {showPersonal ? <Personal info={person.description} cancel={() => setShowPersonal(false)}></Personal> : ""}
        </div>
  )
}
