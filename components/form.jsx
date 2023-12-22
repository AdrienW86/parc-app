import React, {useEffect, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { roomsData } from '@/utils/room';
import Signature from '@/components/signature';
import styles from '@/styles/form.module.css';

const criteriaOptions = [
  { label: 'Très bon', color: 'green' },
  { label: 'Bon', color: 'yellowgreen' },
  { label: 'Correct', color: 'orange' },
  { label: 'Mauvais', color: 'red' },
];

const MyForm = () => {


  function formatDate(date) {
    // Vérifier si la date est une chaîne de caractères, si c'est le cas, la convertir en objet Date
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
  
    // Obtenir les composants de la date
    const day = date.getDate();
    const month = date.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
    const year = date.getFullYear();
  
    // Ajouter un zéro devant le jour et le mois si nécessaire
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    // Retourner la date formatée
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  
  // Exemple d'utilisation
  const myDate = new Date(); // Remplacez cela par votre objet Date
  const formattedDate = formatDate(myDate);
  console.log(formattedDate);
  

  

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
  
  console.log(pieces)

  const getCategoryName = (category) => {
    switch (category) {
      case 'Revêtements des sols':
        return 'sol';
      case 'Meubles / Menuiseries':
        return 'meubles';
      case 'Plafonds':
        return 'plafond';
      case 'Eléctricité / Plomberie':
        return 'electricity';
      default:
        return '';
    }
  };

  const getButtonStyle = (room, category, option) => {
    const pieceIndex = pieces.findIndex((piece) => piece.name === room.name);

    if (pieceIndex !== -1) {
      const categoryName = getCategoryName(category);
      const currentOption = pieces[pieceIndex][categoryName];

      
      console.log("Current Option:", pieces[piecesIndex]);

      return {
        backgroundColor: currentOption && currentOption.label === option.label ? option.color : 'initial',
        color: currentOption && currentOption.label === option.label ? 'white' : 'initial',
      };
    }

    return {};
  };

  useEffect(()=> {
    
   },[getButtonStyle])

  const handleButtonClick = (room, option, category) => {

    console.log(option)
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

    console.log(openAudit);

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
      {roomsData.map((room) => (
        <div key={room.name} className={styles.room}>
          <h3 className={styles.h3}>{room.title}</h3>
          {room.label.map((category) => (
            <div key={category} className={styles.category}>
              <p className={styles.label}>{category}</p>
              <div className={styles.labelBox}>
               {criteriaOptions.map((option) => (
                <button
                  type='button'
                  key={option.label}
                  className={option.color === "red" ? styles.red: styles.button }
                 
                  onClick={() => handleButtonClick(room, option, category)}
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