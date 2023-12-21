import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/logo.jpg'
import Loupe from '@/assets/loupe.png'
import Calendar from '@/assets/calendar.png'
import Link from 'next/link'
import styles from '@/styles/header.module.css'

export default function header() {
  return (
   <header className={styles.header}>
        <ul className={styles.nav}> 
        <li className={styles.logo}> 
          <Link href="https://www.le-parc-de-gouts.fr">
              <Image 
                src={Logo}
                width={90}
                height={90}
                priority
                className={styles.logoImg}
                alt='logo du site le parc de goûts'
              />
            </Link> 
          </li>                    
          <li className={styles.calendar}>
            <Link href="/calendar">
              <Image 
                src={Calendar}
                width={30}
                height={30}
                priority
                className={styles.logoImg} 
                alt='image de calendrier'
              />
              <p className={styles.p}> Calendrier </p>
            </Link>            
          </li>
          <li className={styles.audit}>
            <Link href="/audit">
              <Image 
                src={Loupe}
                width={30}
                height={30}
                priority
                className={styles.logoImg}
                alt='image de loupe'
              />
              <p className={styles.p}> Etat des lieux </p> 
            </Link>                
          </li>
        </ul>
   </header>
  )
}
