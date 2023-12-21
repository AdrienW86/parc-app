import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/sign.module.css'

export default function Login() {
  const router = useRouter();
 
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
       
        const { token } = await response.json();
        localStorage.setItem('token', token)
         
        router.push('/profil');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Une erreur s\'est produite lors de la connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.modal}>
      <form className={styles.signForm}>
        <label className={styles.label}>Email:</label>
        <input type="email" name="email" value={user.email} onChange={handleInputChange} />
        <br />
        <label className={styles.label}>Mot de passe:</label>
        <input type="password" name="password" value={user.password} onChange={handleInputChange} />
        <br />

        <button disabled={loading} className={styles.link} type="button" onClick={loginUser}>
          {loading ? 'Chargement...' : 'Se connecter'}
        </button>
      </form>
    </section>
  );
}
