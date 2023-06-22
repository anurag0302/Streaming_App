import React from 'react'
import styles from './Header.module.css'
import { Cart } from '../../icons'
const Header = () => {
  return (
    <div className={styles.header}>
        <div className={styles.logo}>
            <h3>Amway Live Shopping</h3>
        </div>
        <div className={styles.cart}>
            <button style={{background:'none'}}><Cart/></button>
        </div>
    </div>
  )
}

export default Header