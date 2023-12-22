import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Check from '@/assets/check.png'
import Image from 'next/image';
import styles from '@/styles/signature.module.css'

const Signature = ({ onSignatureChange }) => {
  const signatureRef = useRef();
  const [signatureImage, setSignatureImage] = useState(null);

  const handleSave = () => {
    const signatureDataUrl = signatureRef.current.toDataURL();
    setSignatureImage(signatureDataUrl);
    onSignatureChange(signatureDataUrl);
  };

  const onDelete = (el) => {
    el.current.clear()
    setSignatureImage("")
  }

  return (
    <>
      <div className={styles.signature}>
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{ width: 300, height: 200, margin: 400, className: 'signature' }}
      />
      <div className={styles.box}>      
        <button type='button' className={styles.btnSave} onClick={handleSave}> Valider </button>
        <button type='button' className={styles.btnDelete} onClick={() => onDelete(signatureRef)}>Effacer </button>
      </div>
    </div>
    {signatureImage && (
        <div className={styles.boxCheck}>
          <p> Signature validée</p>
          <Image 
            src={Check} 
            alt="Signature" 
            width={20}
            height={20}
            priority
            className={styles.check}
          />       
        </div>
      )}
    </>
  );
};

export default Signature;