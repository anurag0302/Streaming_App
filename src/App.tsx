import React from 'react';
import Home from './screens/Home';
import Header from './components/header/Header';
import './App.css'
import { THEMELIGHT } from './components/utils/styles';
const App = () => {
 
  return (
    <div style={{backgroundColor:THEMELIGHT.Background,minHeight :'100vh'}}>
      <Header/>
      <Home/>
    </div>
  )
}

export default App