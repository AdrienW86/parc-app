import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/UserContext';
import styles from '@/styles/audit.module.css';

export default function OpenAuditsId() {
  const router = useRouter();
  const { id } = router.query;
  const userId = parseInt(id, 10);

  const { user, fetchUserData } = useUser();

  const [audit, setAudit] = useState(null);


  const [signatureImage, setSignatureImage] = useState('');
  const [signatureImage2, setSignatureImage2] = useState('');

  useEffect(() => {
    fetchUserData();
    if (userId !== undefined && user && user.openAudit && user.openAudit[userId]) {
      setAudit(user.openAudit[userId]);
      // Utilisez directement la signatureImage ici
      setSignatureImage(user.openAudit[userId].userSignature);
      setSignatureImage2(user.openAudit[userId].clientSignature);
    }
  }, [userId, user]);
  

  return (
    <section className={styles.container}>
      {audit && (
        <div className={styles.audit}>
          <h1 className={styles.h1}>Etat des lieux</h1>
            <div className={styles.boxDate}>
              <p className={styles.date}>Entrée, réalisée le : {audit.date}</p>
              {/* <p className={styles.date}>Sortie,  réalisée le : {audit.departure}</p> */}
            </div>
          <h2 className={styles.h2}>Les locaux</h2>
          <p className={styles.p}>
            Adresse du bien: {' '}
           
          </p>
          <section className={styles.adress}>
            <div className={styles.people  }>
              <h2 className={styles.h3}> Le bailleur</h2>
              <p className={styles.p}> Nom: Gutierrez François </p>
              <p className={styles.p}> Adresse:  </p>
              <p className={styles.p}>  </p>
            </div>
            <div className={styles.dash}> </div>
            <div className={styles.people}>
              <h2 className={styles.h3}> Le locataire</h2>
              <p className={styles.p}> Nom: {audit.name} {audit.firstname}</p>
              <p className={styles.p}> Adresse: {audit.address.number} {audit.address.street} </p>
              <p className={styles.p}>{audit.address.zipcode}  {audit.address.city} {audit.address.country} </p>
            </div>
          </section>
          <section className={styles.list}>
            {audit.pieces.map((el, index)=> (
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
                       <td className={styles.td}>{el.sol.label}</td>
                       <td className={styles.td}></td>
                       <td className={styles.td}>{el.sol.comment}</td>
                     </tr>
                     <tr>
                       <td className={styles.td}>Murs / Menuiseries </td>
                       <td className={styles.td}>{el.meubles.label}</td>
                       <td className={styles.td}></td>
                       <td className={styles.td}>{el.meubles.comment}</td>
                     </tr>
                     <tr>
                       <td className={styles.td}>Plafonds</td>
                       <td className={styles.td}>{el.plafond.label}</td>
                       <td className={styles.td}>{}</td>
                       <td className={styles.td}>{el.plafond.comment}</td>
                     </tr>
                     <tr>
                       <td className={styles.td}>Electrcité / Plomberie</td>
                       <td className={styles.td}>{el.electricity.label}</td>
                       <td className={styles.td}></td>
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
              {signatureImage && <img className={styles.userSignature} src={signatureImage} alt="Signature" />}
              <div className={styles.boxDate}>
                <p className={styles.p}>Entrée, le : {audit.date}</p>
                {/* <p className={styles.p}>Sortie, le : {audit.departure}</p> */}
              </div>
              <div className={styles.signature}></div>
            </div>  
            <div className={styles.dash}></div>                 
            <div className={styles.boxSign2}>
              <h3 className={styles.h5}> Le locataire </h3>
              <p className={styles.p2}> Signature précédée de votre nom, prénom et « certifié exact » </p>
              {signatureImage && <img className={styles.clientSignature} src={signatureImage2} alt="Signature" />}
              <div className={styles.boxDate}>
                <p className={styles.p}>Entrée, le : {audit.date} </p>
               
                {/* <p className={styles.p}>Sortie, le : {audit.departure}</p> */}
              </div>
              <div className={styles.signature}></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
