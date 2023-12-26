import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/UserContext';
import { downloadPDF } from '@/utils/generatepdf';
import styles from '@/styles/audit.module.css';

export default function OpenAuditsId() {
  const router = useRouter();
  const { id } = router.query;
  const userId = parseInt(id, 10);

  const { user, fetchUserData } = useUser();

  const closeAudit = () => {
    router.push(`/audit/close/${userId}?id=${userId}`);
  }
  
  useEffect(() => {
    fetchUserData();
    if (userId !== undefined && user && user.openAudit && user.openAudit[userId]) {
    }
   
  }, [userId]);

  console.log(user)
  
  return (
    <section className={styles.container} id="pdf-container">
      {user && (
        <div className={styles.audit}>
          <div className={styles.boxBtn}>
            <button onClick={()=> downloadPDF(user.openAudit[userId])} className={styles.download}> Télécharger </button>
            <button onClick={()=> closeAudit(userId)} className={styles.close}> Clôturer </button>
          </div>
          <h1 className={styles.h1}>Etat des lieux</h1>
            <div className={styles.boxDate}>
              <p className={styles.date}>Entrée, réalisée le : {user.openAudit[userId].date}</p>
              {/* <p className={styles.date}>Sortie,  réalisée le : {audit.departure}</p> */}
            </div>
          <h2 className={styles.h2}>Les locaux</h2>
          <p className={styles.p}>
            Adresse du bien: Adresse: 264 lieu-dit Goûts {' '}  47190 Aiguillon         
          </p>
          <section className={styles.adress}>
            <div className={styles.people  }>
              <h2 className={styles.h3}> Le bailleur</h2>
              <p className={styles.p}> Nom: Gutierrez François </p>
              <p className={styles.p}> Adresse: 264 lieu-dit Goûts </p>
              <p className={styles.p}> 47190 Aiguillon </p>
            </div>
            <div className={styles.dash}> </div>
            <div className={styles.people}>
              <h2 className={styles.h3}> Le locataire</h2>
              <p className={styles.p}> Nom: {user.openAudit[userId].name} {user.openAudit[userId].firstname}</p>
              <p className={styles.p}> Adresse: {user.openAudit[userId].address.number} {user.openAudit[userId].address.street} </p>
              <p className={styles.p}> {user.openAudit[userId].address.zipcode}  {user.openAudit[userId].address.city} {user.openAudit[userId].address.country} </p>
            </div>
          </section>
          <section className={styles.list}>
            {user.openAudit[userId].pieces.map((el, index)=> (
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
              {user.openAudit[userId].userSignature && <img className={styles.userSignature} src={user.openAudit[userId].userSignature} alt="Signature" />}
              <div className={styles.boxDate}>
                <p className={styles.p}>Entrée, le : {user.openAudit[userId].date}</p>
                {/* <p className={styles.p}>Sortie, le : {audit.departure}</p> */}
              </div>
              <div className={styles.signature}></div>
            </div>  
            <div className={styles.dash}></div>                 
            <div className={styles.boxSign2}>
              <h3 className={styles.h5}> Le locataire </h3>
              <p className={styles.p2}> Signature précédée de votre nom, prénom et « certifié exact » </p>
              {user.openAudit[userId].clientSignature && <img className={styles.clientSignature} src={user.openAudit[userId].clientSignature} alt="Signature" />}
              <div className={styles.boxDate}>
                <p className={styles.p}>Entrée, le : {user.openAudit[userId].date} </p>              
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
