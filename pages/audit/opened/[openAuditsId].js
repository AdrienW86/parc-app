import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { user } from '@/data';
import styles from '@/styles/audit.module.css';

export default function OpenAuditsId() {
  const router = useRouter();
  const { id } = router.query;
  const userId = parseInt(id, 10);

  const [audit, setAudit] = useState(null);

  useEffect(() => {
    if (userId !== undefined && user && user.openAudit && user.openAudit[userId]) {
      setAudit(user.openAudit[userId]);
    }
  }, [userId, user]);

  return (
    <section className={styles.container}>
      {audit && (
        <div className={styles.audit}>
          <h1 className={styles.h1}>Etat des lieux</h1>
            <div className={styles.boxDate}>
              <p className={styles.date}>Entrée, réalisée le : {audit.date}</p>
              <p className={styles.date}>Sortie,  réalisée le : {audit.departure}</p>
            </div>
          <h2 className={styles.h2}>Les locaux</h2>
          <p className={styles.p}>
            Adresse du bien: {user.adress.number} {user.adress.street} {user.adress.zipcode}{' '}
            {user.adress.city} {user.adress.country}
          </p>
          <section className={styles.adress}>
            <div className={styles.people  }>
              <h2 className={styles.h3}> Le bailleur</h2>
              <p className={styles.p}> Nom: Gutierrez François </p>
              <p className={styles.p}> Adresse: {user.adress.number} {user.adress.street} </p>
              <p className={styles.p}> {user.adress.zipcode}  {user.adress.city} {user.adress.country} </p>
            </div>
            <div className={styles.dash}> </div>
            <div className={styles.people}>
              <h2 className={styles.h3}> Le locataire</h2>
              <p className={styles.p}> Nom: {audit.name} {audit.firstname}</p>
              <p className={styles.p}> Adresse: {audit.adress.number} {audit.adress.street} </p>
              <p className={styles.p}>{audit.adress.zipcode}  {audit.adress.city} {user.adress.country} </p>
            </div>
          </section>
          <section className={styles.list}>
            {audit.pieces.map((el, index)=> (
              <div key={index} className={styles.state }>
                <h2 className={styles.h4}> {el.name} </h2>
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
                       <td className={styles.td}>{el.sol}</td>
                       <td className={styles.td}>{el.exitElectricity}</td>
                       <td className={styles.td}>{el.solComment}</td>
                     </tr>
                     <tr>
                       <td className={styles.td}>Murs / Menuiseries </td>
                       <td className={styles.td}>{el.meubles}</td>
                       <td className={styles.td}>{el.exitElectricity}</td>
                       <td className={styles.td}>{el.meublesComment}</td>
                     </tr>
                     <tr>
                       <td className={styles.td}>Plafonds</td>
                       <td className={styles.td}>{el.plafond}</td>
                       <td className={styles.td}>{el.exitElectricity}</td>
                       <td className={styles.td}>{el.plafondComment}</td>
                     </tr>
                     <tr>
                       <td className={styles.td}>Electrcité / Plomberie</td>
                       <td className={styles.td}>{el.electricity}</td>
                       <td className={styles.td}>{el.exitElectricity}</td>
                       <td className={styles.td}>{el.electricityComment}</td>
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
                <p className={styles.p}>Entrée, le : {audit.date}</p>
                <p className={styles.p}>Sortie, le : {audit.departure}</p>
              </div>
              <div className={styles.signature}></div>
            </div>  
            <div className={styles.dash}></div>                 
            <div className={styles.boxSign}>
              <h3 className={styles.h5}> Le locataire </h3>
              <p className={styles.p2}> Signature précédée de votre nom, prénom et « certifié exact » </p>
              <div className={styles.boxDate}>
                <p className={styles.p}>Entrée, le : {audit.date}</p>
                <p className={styles.p}>Sortie, le : {audit.departure}</p>
              </div>
              <div className={styles.signature}></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
