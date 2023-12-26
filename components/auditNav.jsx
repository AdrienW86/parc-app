import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/auditNav.module.css';
import { useUser } from '@/utils/UserContext';

export default function AuditNav() {
  const router = useRouter();
  const { id } = router.query;
  const userId = parseInt(id, 10);

  const { user, fetchUserData } = useUser();
  const [listTitle, setListTitle] = useState("Audits en cours");
  const [openAudit, setOpenAudit] = useState(true);
  const [closeAudit, setCloseAudit] = useState(false);

  console.log(user)

  const createAudit = () => {
    router.push('/audit/create');
  };

  const showOpenAudit = () => {
    setListTitle("Audits en cours");
    setCloseAudit(false);
    setOpenAudit(true);
  };

  const showCloseAudit = () => {
    setListTitle("Audits fermés");
    setOpenAudit(false);
    setCloseAudit(true);
  };
 
  const showOneClosedAudit = (index) => {
    router.push(`/audit/closed/[closedAuditId]?id=${index}`);
  };

  const showOneOpenAudit = (index) => {
    router.push(`/audit/opened/[openAuditId]?id=${index}`);
  };

  const deleteOneOpenAudit = async (index) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer cette facture ?` );        
    if (confirmDelete) {
      const token = localStorage.getItem('token');
        try { 
          const response = await fetch(`/api/delete-open?openId=${index}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
           window.location.reload()
          } else {
            console.error('Error deleting invoice:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting invoice:', error.message);
        }
    }
  };

  useEffect(() => {
    fetchUserData();
    if (userId !== undefined && user && user.openAudit && user.openAudit[userId]) {
    }
   
  }, [userId]);
  
  
  return (
    <>    
      <div>
          <section className={styles.btnContainer}>
            <button className={styles.btn} onClick={createAudit}>
              Créer un audit
            </button>
            <button className={styles.btn} onClick={showOpenAudit}>
              Audits en cours
            </button>
            <button className={styles.btn} onClick={showCloseAudit}>
              Audits fermés
            </button>
          </section>
          <section className={styles.listAudit}>
            <h2 className={styles.title}> Liste de vos audits: </h2>
            <h3 className={closeAudit ? styles.close : styles.open}>{listTitle}</h3>
            {openAudit && (
              <div>
                {user === null ? (
                  <div className={styles.empty}> Vous n'avez aucun audit en cours.</div>
                ) : (
                  <div className={styles.container}>
                    {user.openAudit.map((el, index) => (
                      <div key={index} className={styles.openAudit}>
                        <p>
                          Nom: <span className={styles.span}> {el.name} </span>
                        </p>
                        <p>
                          Prénom: <span className={styles.span}> {el.firstname} </span>
                        </p>
                        <p>
                          Arrivée: <span className={styles.spanDate}> {el.date} </span>
                        </p>
                       <div> 
                        <button className={styles.showBtn} onClick={() => showOneOpenAudit(index)}>
                            Voir
                          </button>
                          <button className={styles.deleteBtn} onClick={() => deleteOneOpenAudit(index)}>
                            Supprimer
                          </button>
                       </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {closeAudit && (
              <div>
                {user === null ? (                 
                  <div> Erreur lors du chargement de vos données</div>                
                ) : (                  
                  <section>
                    {user.closeAudit.length === 0 
                    ?
                    <div className={styles.empty}> Vous n'avez aucun audit fermés.</div> 
                    : 
                    <div>
                    {user.closeAudit.map((el, index) => (
                      <div key={index} className={styles.openAudit}>
                        <p>
                          Nom: <span className={styles.span}> {el.name} </span>
                        </p>
                        <p>
                          Prénom: <span className={styles.span}> {el.firstname} </span>
                        </p>
                        <p>
                          Arrivée: <span className={styles.spanDate}> {el.date} </span>
                        </p>
                        <p>
                          Départ: <span className={styles.spanDeparture}> {el.departure} </span>
                        </p>
                        <button className={styles.showBtn} onClick={() => showOneClosedAudit(index)}>
                          Voir
                        </button>
                      </div>
                    ))}
                  </div>}
                  </section>
                )}
              </div>
            )}
          </section>
        </div>    
    </>
  );
}
