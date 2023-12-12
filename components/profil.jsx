import React from 'react'
import Image from 'next/image'
import Loupe from '@/assets/loupe.png'
import Calendar from '@/assets/calendar.png'
import Params from '@/assets/params.png'
import styles from '@/styles/profil.module.css'

export default function profil() {

    const handleParams = () => {
        console.log("params")
    }

  return (
    <section>
         <div className={styles.boxH1}>
            <Image 
                src={Params}
                width={35}
                height={35}
                priority
                onClick={handleParams}
                className={styles.logoParams}
            />  
            <h1 className={styles.title}> Parc-App </h1>
        </div>
        <article className={styles.article}>
            Vous pouvez à partir de votre application générer un état 
            des lieux ou accéder à votre calendrier en ligne. Vous pouvez
             également accéder à votre site en cliquant sur le logo et modifier 
             vos pamètres en cliquant sur l'icône. 
            <Image
                src={Params}
                width={5}
                height={5}
                priority                
                className={styles.logoParams}
            />    
        </article>
        <div className={styles.boxH2}>
            <Image 
                src={Calendar}
                width={30}
                height={30}
                priority
                className={styles.logoImg}
            />  
            <h2 className={styles.h2}> Calendrier </h2>
        </div>
        <article className={styles.article}>
           Gérez en toute efficacité votre calendrier en ajoutant vos réservations autre que 
           celles réalisées sur votre site. Vous garder ainsi une vision d'ensemble de vos clients.
        </article>
        <div className={styles.boxH2}>
            <Image 
                src={Loupe}
                width={30}
                height={30}
                priority
                className={styles.logoImg}
            />  
        <h2 className={styles.h2}> Etat des lieux </h2>
        </div>
        <article className={styles.article}>
            Créez simplement un état des lieux en rentrant les informations
            de votre client. Le document sera automatiquement enregistré et 
            vous aurez le choix entre le télécharger, l'imprimer ou l'envoyer par email.
        </article>        
    </section>
  )
}
