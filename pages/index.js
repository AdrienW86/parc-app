import styles from '@/styles/Home.module.css'
import Sign from '@/components/sign'
import Login from '@/components/login'

export default function Home() {
  return (
    <>
        <div className={styles.background}></div>         
        <h2> Connectez vous</h2>
       <Login />   
    </>
  )
}
