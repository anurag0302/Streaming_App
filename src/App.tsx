import React from 'react'
import Home from './screens/Home';
import Header from './components/header/Header';
import App2 from './components/IVSPlayer/IvsP2';
const App = () => {
  const streamUrl='https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8';

  return (
    <div>
      <Header/>
      <Home/>
   
    </div>
  )
}

export default App