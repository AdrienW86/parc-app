import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import styles from '@/styles/auditNav.module.css'
import { useUser } from '@/utils/UserContext';

export default function auditNav() {

    const router = useRouter();
    const { user, fetchUserData } = useUser();

    const [listTitle, setListTitle] = useState("Audits en cours")
    const [openAudit, setOpenAudit] = useState(true)
    const [closeAudit, setCloseAudit] = useState(false)

    const createAudit = () => {
      router.push('/audit/create')
    }

    const showOpenAudit = () => {
        setListTitle("Audits en cours")
        setCloseAudit(false)
        setOpenAudit(true)
    }

    const showCloseAudit = () => {
        setListTitle("Audits fermés")
        setOpenAudit(false)
        setCloseAudit(true)
    }

    const showOneClosedAudit = (index) => {
        console.log(index)
        router.push(`/audit/closed/[closedAuditId]?id=${index}`)
    }

    const showOneOpenAudit = (index) => {
        console.log(index)
        router.push(`/audit/opened/[openAuditId]?id=${index}`)
    }

    useEffect(() => {     
      fetchUserData();
      console.log(user)
    },[]);
  
  return (
    <>
        <section className={styles.btnContainer}>
            <button className={styles.btn} onClick={createAudit} > Créer un audit</button>
            <button className={styles.btn} onClick={showOpenAudit}> Audits en cours</button>
            <button className={styles.btn} onClick={showCloseAudit}> Audits fermés</button>
        </section>
        <section className={styles.listAudit}>
            <h2 className={styles.title}> Liste de vos audits: </h2>
            <h3 className={closeAudit ? styles.close : styles.open}> {listTitle} </h3>
            {openAudit &&           
                <div>
                  {user.openAudit.length === 0
                    ? 
                    <div className={styles.empty}> Vous n'avez aucun audit en cours.</div>
                    :
                    <div>
                      {user.openAudit.map((el, index) => (
                        <div 
                            key={index}
                            className={styles.openAudit}
                        > 
                            <p> Nom: <span className={styles.span}> {el.name } </span></p>
                            <p> Prénom: <span className={styles.span}> {el.firstname } </span></p>
                            <p> Arrivée: <span className={styles.spanDate}> {el.date } </span></p>
                            <button className={styles.showBtn} onClick={() => showOneOpenAudit(index)}> Voir </button>
                        </div> 
                      ))}
                    </div>
                  }
                </div> 
            }
            {closeAudit &&
                <div>
                  {user.closeAudit.length === 0
                    ? 
                    <div className={styles.empty}> Vous n'avez aucun audit fermés.</div>
                    :
                    <div>
                      {user.closeAudit.map((el, index) => (
                        <div 
                            key={index}
                            className={styles.openAudit}
                        > 
                            <p> Nom: <span className={styles.span}> {el.name } </span></p>
                            <p> Prénom: <span className={styles.span}> {el.firstname } </span></p>
                            <p> Arrivée: <span className={styles.spanDate}> {el.date } </span></p>
                            <p> Départ: <span className={styles.spanDeparture}> {el.departure } </span></p>
                            <button className={styles.showBtn} onClick={() => showOneClosedAudit(index)}> Voir </button>
                        </div> 
                      ))}
                    </div>                    
                  }
                </div>
            }
        </section>
    </>
  )
}