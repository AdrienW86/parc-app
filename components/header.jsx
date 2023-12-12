import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/logo.jpg'
import Loupe from '@/assets/loupe.png'
import Calendar from '@/assets/calendar.png'
import styles from '@/styles/header.module.css'

export default function header() {
  return (
   <header className={styles.header}>
        <ul className={styles.nav}> 
        <li className={styles.logo}> 
              <Image 
                src={Logo}
                width={90}
                height={90}
                priority
                className={styles.logoImg}
              />
            </li>
            
           
            <li className={styles.calendar}>
              <Image 
                src={Calendar}
                width={50}
                height={50}
                priority
                className={styles.logoImg}
              />
              <p className={styles.p}> Calendrier </p> 
            </li>
            <li className={styles.audit}>
              <Image 
                src={Loupe}
                width={50}
                height={50}
                priority
                className={styles.logoImg}
              />
                <p className={styles.p}> Etat des lieux </p> 
            </li>
        </ul>
   </header>
  )
}
