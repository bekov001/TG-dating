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
    const [personArray, setPersonArray] = useState([
      {
        id: 19,
        age: 19,
        photos: ["https://d3sc42dkmius1e.cloudfront.net/Upload/669/CMS/News/Photos/1492a5fb-ae6.jpg", "https://static2.iodonna.it/wp-content/uploads/2024/07/clean-girl-hailey-bieber-slider.jpg?v=2372010", "https://scc10.com.br/wp-content/uploads/2022/08/hailey-bieber.jpeg"],
        description: "С кем бы погулять?",
        city: "Санкт-Петербург",
        name: "Милана"
      },
      {
      id: 19,
      age: 19,
      photos: ["https://www.itgirl.in/cdn/shop/files/itgirl_swimwear1473_08668bf1-40f4-4cbe-80fe-11a5b0821c30_800x.jpg?v=1686728323" , "https://www.itgirl.in/cdn/shop/files/itgirl_swimwear1477_f98ba03e-3a5f-44c9-a488-6133fc3deb6d_800x.jpg?v=1686728323"],
      description: "Ищу друзей",
      city: "Москва",
      name: "Анель"
    },
    {
      id: 21,
      age: 18,
      photos: ["https://style-republik.com/wp-content/uploads/2022/07/@whoiskat.jpg"],
      description: "Ищу спокойного и уютного парня",
      city: "Москва",
      name: "Адия"
    }
  ])
    const [empty, setEmpty] = useState(false)
    const [loading, setLoading] = useState(true)
    const [logged, setLogged] = useState(false)
    const [index, setIndex] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [person, setPerson] = useState({
      id: 19,
      age: 19,
      photos: ["https://d3sc42dkmius1e.cloudfront.net/Upload/669/CMS/News/Photos/1492a5fb-ae6.jpg", "https://static2.iodonna.it/wp-content/uploads/2024/07/clean-girl-hailey-bieber-slider.jpg?v=2372010", "https://scc10.com.br/wp-content/uploads/2022/08/hailey-bieber.jpeg"],
      description: "С кем бы погулять?",
      city: "Санкт-Петербург",
      name: "Милана"
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
        form_id: person.id,
        access_token: localStorage.getItem('jwt')?.split(" ")[1]
       
    }));
    if (index + 1 < personArray.length){
      setCurrentIndex(0)
    setPerson(personArray[index + 1])
    setIndex(index + 1);
    } else {
      setEmpty(true)
      sendJsonMessage(({
        type: "get",
        access_token: localStorage.getItem('jwt')?.split(" ")[1]
    }));
      // setLoading(true)

}
  }

  function back(){
    
   
  if (index > 0){
    setCurrentIndex(0)
  setPerson(personArray[index - 1])
  setIndex(index - 1);
  } else {
  }
}

function submit(value: number[]){
  changeFilter(value)
  sendJsonMessage(({
    type: "get",
    access_token: localStorage.getItem('jwt')?.split(" ")[1]
}));
// setLoading(true)

}
  

  function dislike(){
    // setCurrentIndex(0)
    
    sendJsonMessage(({
      type: "dislike",
      access_token: localStorage.getItem('jwt')?.split(" ")[1],
      form_id: person.id
     
  }));
  if (index + 1 < personArray.length){
    setCurrentIndex(0)
  setPerson(personArray[index + 1])
  setIndex(index + 1);
  } else {
    setEmpty(true)
    sendJsonMessage(({
      type: "get",
      access_token: localStorage.getItem('jwt')?.split(" ")[1]
  }));
// setLoading(true)
}
}

    const { lastMessage, sendJsonMessage} = useWebSocket("wss://virusq.tech/dating_api/v1/user/form/ws", {
       onError: (e) => console.error('Error in websocket', e),
      onOpen: () => {
        if (!logged){
          setLogged(true)
        }
          // try {
          //   sendJsonMessage(({
          //         type: "auth",
          //         access_token: localStorage.getItem('jwt')?.split(" ")[1]
          //     }));
          //     console.log(localStorage.getItem('jwt'))
            
          // } catch (error) {
          //     console.error("WebSocket Error:", error); 
          // }
      },
      onMessage: (e) => {
        // console.log("овтет")
          const data = JSON.parse(e.data);
           if (data.forms && data.forms.length > 0) {
            setPersonArray(data.forms)
            setIndex(0)
            setPerson(data.forms[0])
            setEmpty(false)
            setLoading(false)
          }  else if (data.forms && data.forms.length === 0) {
            setEmpty(true)
          }
          console.log(data)
          // setPerson(data)
      },
      shouldReconnect: (closeEvent) => true,
  });

    useEffect(() => {
      setTimeout(() => setLoading(false), 1000)
      if (logged){
      sendJsonMessage(({
                type: "get",
                access_token: localStorage.getItem('jwt')?.split(" ")[1]
            }));
          }
    }, [logged]);

  return (
    <div className={styles.back} {...bind}>
        <div className={styles.main}>
        <Header user={user} open={openFilter} ></Header>
        {/* <LoadingSpinner></LoadingSpinner> */}
        {!empty && !loading ? <MainCarousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} person={person} slides={person.photos}></MainCarousel>: empty ? <Empty image={user.avatar}></Empty>: ""}
       {loading && <LoadingSpinner></LoadingSpinner>}
       {!empty && !loading && <div className={styles.buttons}>
        <button className={styles.return} onClick={() => back()}><img src={"img/undo.svg"}></img></button>
        <button className={styles.close} onClick={() => dislike()}><img src={"img/dislike.svg"}></img></button>
        
        <button className={styles.close}  onClick={() => like()}><img src={"img/heart.svg"}></img></button>
        <button className={styles.return} onClick={() => openPersonal()}><img src={"img/personalcard.svg"}></img></button>
        </div>}
        
        </div>
        {showFilter ? <Filter submit={submit} age={age} cancel={closeFilter}></Filter> : ""}
        {showPersonal ? <Personal person={person} info={person.description} cancel={() => setShowPersonal(false)}></Personal> : ""}
        </div>
  )
}
