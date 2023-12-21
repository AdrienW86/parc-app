import React from 'react'
import { Inter } from 'next/font/google'
import ProfilUser from '@/components/profil'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Profil() {
  return (
        
    <main className={`${styles.main} ${inter.className}`}>
    <ProfilUser />
       </main>
  )
}
