import React from 'react'
import styles from "./header.module.css"

interface IHeader{
    open: () => void,
    user: any
}
export default function Header({open, user}: IHeader) {
  return (
    <div className={styles.header}>
        <div className={styles.profile}><img className={styles.ava} src={"data:image/png;base64," + user.avatar} ></img><p className={styles.name}>{user.name}</p></div>
        <div onClick={open}><img className={styles.filter} src="img/Settings.svg"></img></div>
    </div>
  )
}
