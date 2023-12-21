import React from 'react'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Calendar() {

  const user = {
    name: 'Le Parc De Goûts',
    siret: 12345678987451,
    phone: '06.70.00.93.08',
    email: 'leparcdegouts@orange.fr',
    website: 'le-parc-de-gouts.fr',
    adress: {
        number: 1,
        street: 'parc de goûts',
        zipcode: 47190,
        city: "Aiguillon",
    }
  }

  return (
    <main className={`${styles.main} ${inter.className}`}>
    
       </main>
  )
}
