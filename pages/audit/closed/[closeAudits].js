import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/UserContext';
import styles from '@/styles/audit.module.css';

export default function ClosedAuditsId() {
  const router = useRouter()
  const { id } = router.query;
  const userId = parseInt(id, 10);
  const {user, fetchUserData } = useUser();


  useEffect(() => {
    fetchUserData();
    if (userId !== undefined && user && user.openAudit && user.openAudit[userId]) {
    }
   
  }, [userId]);

  const data = [];

  if (user) {
    console.log(user.closeAudit[userId].prevPieces);
    user.closeAudit[userId].prevPieces.forEach((el, index) => {
      console.log(el.sol.label);
      data.push({
        title: el.title,
        sol: {
          date: el.sol.label,
          departure: user.closeAudit[userId].pieces[index].sol.label,
        },
        meubles: {
          date: el.meubles.label,
          departure: user.closeAudit[userId].pieces[index].meubles.label,
        },
        plafond: {
          date: el.plafond.label,
          departure: user.closeAudit[userId].pieces[index].plafond.label,
        },
        electricity: {
          date: el.electricity.label,
          departure: user.closeAudit[userId].pieces[index].electricity.label,
        },
      });
    });
  }
  
  // Maintenant, "data" contient un tableau d'objets avec les propriétés date et departure pour chaque type.
  console.log(data);
  

  return (
    <section className={styles.container}>
      {user && (
        <div className={styles.audit}>
          <h1 className={styles.h1}>Etat des lieux</h1>
            <div className={styles.boxDate}>
              <p className={styles.date}>Entrée, réalisée le : {user.closeAudit[userId].date}</p>
              <p className={styles.date}>Sortie,  réalisée le : {user.closeAudit[userId].departure}</p>
            </div>
          <h2 className={styles.h2}>Les locaux</h2>
          <p className={styles.p}>
            Adresse du bien: Adresse: 264 lieu-dit Goûts{' '}
            47190 Aiguillon France
          </p>
          <section className={styles.adress}>
            <div className={styles.people  }>
              <h2 className={styles.h3}> Le bailleur</h2>
              <p className={styles.p}> Nom: Gutierrez François </p>
              <p className={styles.p}> Adresse: 264 lieu-dit Goûts  </p>
              <p className={styles.p}> 47190 Aiguillon France </p>
            </div>
            <div className={styles.dash}> </div>
            <div className={styles.people}>
              <h2 className={styles.h3}> Le locataire</h2>
              <p className={styles.p}> Nom: {user.closeAudit[userId].name} {user.closeAudit[userId].firstname}</p>
              <p className={styles.p}> Adresse: {user.closeAudit[userId].address.number} {user.closeAudit[userId].address.street} </p>
              <p className={styles.p}>  {user.closeAudit[userId].address.city} {user.closeAudit[userId].address.country} </p>
            </div>
          </section>
          <section className={styles.list}>
            {data.map((el, index)=> (
              <div key={index} className={styles.state }>
              <h2 className={styles.h4}> {el.title} </h2>
               <table className={styles.table}>
                 <thead>
                   <tr>
                     <th className={styles.th}>Eléments</th>
                     <th className={styles.th}>Etat d'entrée</th>
                     <th className={styles.th}>Etat de sortie</th>
                     <th className={styles.th}>Commentaires</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td className={styles.td}>Revêtement des sols</td>
                     <td className={styles.td}>{el.sol.date}</td>
                     <td className={styles.td}>{el.sol.departure}</td>
                     <td className={styles.td}>{el.sol.comment}</td>
                   </tr>
                   <tr>
                     <td className={styles.td}>Murs / Menuiseries </td>
                     <td className={styles.td}>{el.meubles.date}</td>
                     <td className={styles.td}>{el.meubles.departure}</td>
                     <td className={styles.td}>{el.meubles.comment}</td>
                   </tr>
                   <tr>
                     <td className={styles.td}>Plafonds</td>
                     <td className={styles.td}>{el.plafond.date}</td>
                     <td className={styles.td}>{el.plafond.departure}</td>
                     <td className={styles.td}>{el.plafond.comment}</td>
                   </tr>
                   <tr>
                     <td className={styles.td}>Electrcité / Plomberie</td>
                     <td className={styles.td}>{el.electricity.date}</td>
                     <td className={styles.td}>{el.electricity.departure}</td>
                     <td className={styles.td}>{el.electricity.comment}</td>
                   </tr>
                 </tbody>
              </table>      
            </div>
            ))}          
          </section>
          <h2 className={styles.h2}>Signatures</h2>
          <div className={styles.sign}>
            <div className={styles.boxSign}>
              <h3 className={styles.h5}> Le bailleur </h3>
              <p className={styles.p2}> Signature précédée de « certifié exact »</p>
             
              <div className={styles.boxDate}>
                <p className={styles.p}>Entrée, le : {user.closeAudit[userId].date}</p>
                {user.closeAudit[userId].userSignature && <img className={styles.userSignature} src={user.closeAudit[userId].userSignature} alt="Signature" />}
                <p className={styles.p}>Sortie, le : {user.closeAudit[userId].departure}</p>
                {user.closeAudit[userId].userSignature && <img className={styles.userSignature} src={user.closeAudit[userId].openUserSignature} alt="Signature" />}
              </div>
              <div className={styles.signature}></div>
            </div>  
            <div className={styles.dash}></div>                 
            <div className={styles.boxSign2}>
              <h3 className={styles.h5}> Le locataire </h3>
              <p className={styles.p2}> Signature précédée de votre nom, prénom et « certifié exact » </p>
             
              <div className={styles.boxDate}>
                <p className={styles.p}>Entrée, le : {user.closeAudit[userId].date}</p>
                {user.closeAudit[userId].clientSignature && <img className={styles.clientSignature} src={user.closeAudit[userId].clientSignature} alt="Signature" />}
                <p className={styles.p}>Sortie, le : {user.closeAudit[userId].departure}</p>
                {user.closeAudit[userId].clientSignature && <img className={styles.clientSignature} src={user.closeAudit[userId].openClientSignature} alt="Signature" />}
              </div>
              <div className={styles.signature}></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}