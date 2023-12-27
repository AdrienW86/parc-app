import React, {useEffect, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { roomsData } from '@/utils/room';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/UserContext';
import Signature from '@/components/signature';
import styles from '@/styles/form.module.css';

const criteriaOptions = [
  { label: 'Très bon', color: 'green' },
  { label: 'Bon', color: 'yellowgreen' },
  { label: 'Correct', color: 'orange' },
  { label: 'Mauvais', color: 'red' },
];

const MyForm = () => {

  const router = useRouter()
  const { id } = router.query;
  const userId = parseInt(id, 10);
  const {user, fetchUserData } = useUser();
 
  useEffect(() => {
    fetchUserData();
    if (userId !== undefined && user && user.openAudit && user.openAudit[userId]) {
    }
   
  }, [userId]);

  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
  
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear(); 
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  
  const myDate = new Date(); 
  const formattedDate = formatDate(myDate);
  
  const selectOption = (event) => {
    const buttonElement = event.target;
    const text = event.target.textContent;
    const parentElement = buttonElement.parentElement;
  
    const buttonsInParent = parentElement.querySelectorAll(`.${styles.button}`);
    buttonsInParent.forEach((button) => {
      button.classList.remove(styles.green, styles.yellowgreen, styles.orange, styles.red);
    });
  
    if (text === "Très bon") {
      buttonElement.classList.toggle(styles.green);
    }
    if (text === "Bon") {
      buttonElement.classList.toggle(styles.yellowgreen);
    }
    if (text === "Correct") {
      buttonElement.classList.toggle(styles.orange);
    }
    if (text === "Mauvais") {
      buttonElement.classList.toggle(styles.red);
    }
  };
  
  const clickedLabel = (room, option, category) => {   
    handleButtonClick(room, option, category)    
    selectOption(event)  
  }

  const { handleSubmit, control, register, setValue, watch } = useForm();

  const pieces = roomsData.map((room) => ({
    name: room.name,
    title: room.title,
    sol: {},
    meubles: {},
    plafond: {},
    electricity: {}
  }));

  const handleButtonClick = (room, option, category) => {
    console.log(room)
    console.log(category)
    console.log(option)
    console.log(option.color)
    const pieceIndex = pieces.findIndex((piece) => piece.name === room.name);
    console.log(pieceIndex)
    let categoryName = '';

    switch (category) {
      case 'Revêtements des sols':
        categoryName = 'sol';
        break;
      case 'Meubles / Menuiseries':
        categoryName = 'meubles';
        break;
      case 'Plafonds':
        categoryName = 'plafond';
        break;
      case 'Eléctricité / Plomberie':
        categoryName = 'electricity';
        break;
      default:
        break;
    }

    if (pieceIndex !== -1) {
      pieces[pieceIndex][categoryName] = {
        label: option.label,
        color: option.color,
        comment: ""
      };    
    }  
  };

  const clientSignatureChange = (signatureData) => {
    setValue('clientSignature', signatureData);
  };

  const userSignatureChange = (signatureData) => {
    setValue('userSignature', signatureData);
  };


  const deleteOneOpenAudit = async (index) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir clôturer cet audit ?` );        
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

  const onSubmit = async (data) => {
    console.log(pieces)
    console.log(data)
    const closeAudit = {
      name:  user.openAudit[userId].name,
      firstname: user.openAudit[userId].firstname,
      departure: formattedDate,
      date: user.openAudit[userId].date,
      address: user.openAudit[userId].address,
      pieces: pieces,
      prevPieces: user.openAudit[userId].pieces,
      openUserSignature: user.openAudit[userId].userSignature,
      openClientSignature: user.openAudit[userId].clientSignature,
      userSignature: data.userSignature,
      clientSignature: data.clientSignature
    };

    console.log(closeAudit)

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/save-closeAudit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(closeAudit),
      });

      if (!response.ok) {
        throw new Error('Échec de la requête pour enregistrer le PDF dans la base de données.');
      }
      const responseData = await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du PDF dans la base de données :', error);
    }

   // deleteOneOpenAudit(userId)
  //  router.push('/audit')
  };
  const label = ['Revêtements des sols','Meubles / Menuiseries','Plafonds','Eléctricité / plomberie']
  

  return (
  <>
  {user &&  
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.container}>
        <section className={styles.bailleur}>
          <h2 className={styles.h2}>Nom du bailleur</h2>
          <p className={styles.name}> {user.openAudit[userId].name} {user.openAudit[userId].firstname} </p> 
    
          <h2 className={styles.h2}>Adresse du bailleur</h2>
          <div>
            <p className={styles.number}> {user.openAudit[userId].address.number} </p> 
            <p className={styles.street}> {user.openAudit[userId].address.street}</p>
          </div>
          <div>
            <p className={styles.zipcode}> {user.openAudit[userId].address.zipcode} </p>
            <p className={styles.city}> {user.openAudit[userId].address.city}</p>
          </div>
          <p className={styles.country}> {user.openAudit[userId].address.country}</p>
        </section>
      </div>
      {user.openAudit[userId].pieces.map((room, index) => (
        <div key={index} className={styles.room}>
          <h3 className={styles.h3}>{room.title}</h3>
          {label.map((category, index) => (
            <div key={index} className={styles.category} >
               <div className={styles.label}>
                {category} 
                <span className={styles.spanLabel}>
                  {category === "Revêtements des sols" ? <p style={{color: room.sol.color}} > ({room.sol.label}) </p>: null}
                  {category === "Meubles / Menuiseries" ? <p style={{color: room.meubles.color}}> ({room.meubles.label}) </p>: null}
                  {category === "Plafonds" ? <p style={{color: room.plafond.color}}> ({room.plafond.label}) </p>: null}
                  {category === "Eléctricité / plomberie" ? <p style={{color: room.electricity.color}}> ({room.electricity.label}) </p>: null}
                </span>
              </div>            
              <div className={styles.labelBox}>
               {criteriaOptions.map((option) => (
                <button
                  type='button'
                  key={option.label}
                  className={option.label ? styles.button :styles[option.color]  }             
                  onClick={() => {
                    clickedLabel(room, option, category);                  
                  }}
                 // {...register(`pieces`, { required: true })}
                >
                  {option.label}
                </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      <section className={styles.boxSignature}>
        <div className={styles.signature}>
          <h3 className={styles.h3}>Signature du bailleur</h3>
          <Controller
            name='clientSignature'
            control={control}
            render={({ field }) => <Signature onSignatureChange={(data) => { field.onChange(data); clientSignatureChange(data); }} />}
          />
        </div>
        <div className={styles.signature}>
          <h3 className={styles.h3}>Signature du locataire</h3>
          <Controller
            name='userSignature'
            control={control}
            render={({ field }) => <Signature onSignatureChange={(data) => { field.onChange(data); userSignatureChange(data); }} />}
          />
        </div>
      </section>
      <div className={styles.dash}></div>
      <div>
        <h3 className={styles.h3}>Validation du formulaire</h3>
        <button className={styles.submit} type='submit'>
          Clôturer
        </button>
      </div>
    </form>
  }
  </>
  );
}
export default MyForm;