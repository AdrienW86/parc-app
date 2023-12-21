import React from 'react'
import Params from '@/assets/params.png'
import Home from '@/assets/home.png'
import Image from 'next/image'
import { useRouter } from 'next/router';
import styles from '@/styles/profil.module.css'

export default function title() {

    const router = useRouter()

    const handleParams = () => {
        console.log("params")
    }

    const navigate = (path) => {
        router.push(path)
    }

  return (
    <div className={styles.boxH1}>
        <Image 
            src={Params}
            width={35}
            height={35}
            priority
            onClick={handleParams}
            className={styles.logoParams}
            alt='image paramètres'
        />  
        <h1 className={styles.title}>Le Parc De Goûts </h1>
        <Image 
            src={Home}
            width={35}
            height={35}
            priority
            onClick={()=> navigate('/profil')}
            className={styles.logoHome}
            alt='image de maison'
        />  
    </div>
  )
}
