import React from 'react'
import styles from './Feature.module.css'
import { ViewCount } from '../../../icons'



const Feature = () => {
  return (
    <div className={styles.features}>
      <div className={styles.options}>
        <span className={styles.viewCount}><ViewCount /> 31k</span>

      </div>
    </div>
  )
}

export default Feature