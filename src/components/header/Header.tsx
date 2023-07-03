import React, { useContext } from 'react'
import styles from './Header.module.css'
import { ThemeContext } from '../../context/ThemeContext';
import { THEMEDARK, THEMELIGHT } from '../utils/styles';
import { Cart, CartDark, Moon, Sun } from '../../icons';
const Header = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return null; // Handle when the context is not yet available
  }
  const { theme, setTheme } = themeContext;
  return (
    <div className={styles.header} style={{ backgroundColor: theme === 'light' ? THEMELIGHT.HeaderBackground : THEMEDARK.HeaderBackground, color: theme === 'light' ? THEMEDARK.HeaderBackground : '#fff' }}>
      <div className={styles.logo}>
        <h3>Amway Live Shopping</h3>
      </div>
      <div className={styles.cart}>
        
      <button style={{ background: 'none', border: 'none',marginRight:'10px' }} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? 
          <Moon/>
          : 
          <Sun/>
          }
        </button>
        <button style={{ background: 'none', border: 'none' }}>
          {
            theme === 'light' ? 
            <Cart/>
           :
             <CartDark/>
          }
        </button>
        
      </div>
    </div>
  )
}

export default Header