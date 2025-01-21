import React from 'react'
import styles from "./header.module.css"

interface IHeader{
    open: () => void,
    user: any
}
export default function Header({open, user}: IHeader) {
  return (
    <div className={styles.header}>
        <div className={styles.profile}><img className={styles.ava} src={"https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_3840,g_auto/f_auto/q_auto/shutterstock_2414539851_ss_non-editorial_dcx0bm?_a=BAVARSAP0"} ></img><p className={styles.name}>{user.name}</p></div>
        <div onClick={open}><img className={styles.filter} src="img/Settings.svg"></img></div>
    </div>
  )
}
