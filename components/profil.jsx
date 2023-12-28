import React from 'react'
import Image from 'next/image'
import Loupe from '@/assets/loupe.png'
import Calendar from '@/assets/calendar.png'
import styles from '@/styles/profil.module.css'

export default function profil() {

  return (
    <section className={styles.profil}>
       <section className={styles.infosContainer}>
        <div className={styles.infos}>
                <p> Siret: </p>
                <p> Téléphone: </p>
                <p> Email: </p>
                <p> Site web: </p>
                <p> Adresse: </p>
                <p> Ville: </p>
            </div>
            <div className={styles.userInfos}>
                <p> 12345678987451 </p>
                <p> 06.70.00.93.08 </p>
                <p> leparcdegouts@orange.fr </p>
                <p> leparcdegouts@orange</p>
                <p> 264 lieu-dit Goûts </p>
                <p> 47190 Aiguillon </p>
            </div>
       </section>          
        <h2 className={styles.h2}>
            <Image 
                src={Calendar}
                width={30}
                height={30}
                priority
                onClick={() => navigate('/calendar') }
                className={styles.logoImg}
            />   Calendrier 
        </h2>      
        <article className={styles.article}>
           Gérez en toute efficacité votre calendrier en ajoutant vos réservations autre que 
           celles réalisées sur votre site. Vous garder ainsi une vision d'ensemble de vos clients.
        </article>         
        <h2 className={styles.h2}> 
            <Image 
                src={Loupe}
                width={30}
                height={30}
                priority
                onClick={() => navigate('/audit') }
                className={styles.logoImg}
                alt='une loupe'
            />  
            Etat des lieux 
        </h2>
        <article className={styles.article}>
            Créez simplement un état des lieux en rentrant les informations
            de votre client. Le document sera automatiquement enregistré et 
            vous aurez le choix entre le télécharger, l'imprimer ou l'envoyer par email.
        </article>  
       
    </section>
  )
}
