import React, {useEffect, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { roomsData } from '@/utils/room';
import { useRouter } from 'next/router';
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
  const clientName = watch('clientName', '');
  const clientFirstName = watch('clientFirstName', '');
  const clientAddress = watch(['clientAddress', 'number', 'street', 'city', 'zipcode', 'country'], {
    number: '',
    street: '',
    city: '',
    zipcode: '',
    country: '',
  });

  const pieces = roomsData.map((room) => ({
    name: room.name,
    title: room.title,
    sol: {},
    meubles: {},
    plafond: {},
    electricity: {}
  }));

  const handleButtonClick = (room, option, category) => {
    const pieceIndex = pieces.findIndex((piece) => piece.name === room.name);
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

  const onSubmit = async (data) => {
    const openAudit = {
      name: data.clientName,
      firstname: data.clientFirstName,
      date: formattedDate,
      departure: "à définir",
      address: data.clientAddress,
      pieces: pieces,
      userSignature: data.userSignature,
      clientSignature: data.clientSignature
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/save-openAudit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(openAudit),
      });

      if (!response.ok) {
        throw new Error('Échec de la requête pour enregistrer le PDF dans la base de données.');
      }

      const responseData = await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du PDF dans la base de données :', error);
    }
    router.push('/audit')
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.container}>
        <section className={styles.bailleur}>
          <h2 className={styles.h2}>Nom du bailleur</h2>
          <input {...register('clientName', { required: true })} className={styles.name} type='text' value={clientName} placeholder='Nom du bailleur' />
          <input {...register('clientFirstName', { required: true })} className={styles.name} type='text' value={clientFirstName} placeholder='Prénom du bailleur' />
          <h2 className={styles.h2}>Adresse du bailleur</h2>
          <div>
            <input {...register('clientAddress.number', { required: true })} className={styles.number} type='number' placeholder='Numéro' value={clientAddress.number} />
            <input {...register('clientAddress.street', { required: true })} className={styles.street} type='text' placeholder='Nom de la voie' value={clientAddress.street} />
          </div>
          <div>
            <input {...register('clientAddress.zipcode', { required: true })} className={styles.zipcode} type='number' placeholder='Code postal' value={clientAddress.zipcode} />
            <input {...register('clientAddress.city', { required: true })} className={styles.city} type='text' placeholder='Nom de la ville' value={clientAddress.city} />
          </div>
          <input {...register('clientAddress.country', { required: true })} className={styles.country} type='text' placeholder='Pays' value={clientAddress.country} />
        </section>
      </div>
      {roomsData.map((room, index) => (
        <div key={index} className={styles.room}>
          <h3 className={styles.h3}>{room.title}</h3>
          {room.label.map((category) => (
            <div key={category} className={styles.category}>
              <p className={styles.label}>{category}</p>
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
          Soumettre
        </button>
      </div>
    </form>
  );
}
export default MyForm;