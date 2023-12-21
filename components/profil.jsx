import React from 'react'
import Image from 'next/image'
import {user} from '@/data'
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
                <p> {user.siret} </p>
                <p> {user.phone} </p>
                <p> {user.email} </p>
                <p> {user.website} </p>
                <p> {user.adress.number} {user.adress.street} </p>
                <p> {user.adress.zipcode} {user.adress.city} </p>
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
