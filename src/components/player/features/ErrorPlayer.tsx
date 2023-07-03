import React from 'react'
import styles from './ErrorPlayer.module.css'
import { Reload } from '../../icons'

type ErrorPlayerProps={
  error:string
}

const ErrorPlayer = ({error}:ErrorPlayerProps) => {

  const error1='The media could not be loaded, either because the server or network failed or because the format is not supported.'

  return (
    <div className={styles.player} style={{display:!error?'none':'flex'}}>
      <p style={{textAlign:'center'}}>{error === error1 ? "Stream is not Available" : "Stream is not Available"}<br />Reload</p>

      <button className={styles.button} onClick={() => {
       window.location.reload();

      }}>{<Reload/>}</button>
    </div>
  )
}

export default ErrorPlayer