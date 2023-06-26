import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import styles from './IVSPlayer.module.css';
import { registerIVSTech } from 'amazon-ivs-player';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/sea/index.css';

import wasmBinaryPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.wasm';
import wasmWorkerPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.js';




const createAbsolutePath = (assetPath: string) =>
  new URL(assetPath, document.URL).toString();

const IVSPlayer: React.FC<{ streamUrl: string }> = ({ streamUrl }) => {
  // const [errorPlayer, setErrorPlayer] = useState('')
  const videoRef = useRef(null);
  const playerRef = useRef<any>(null);
  registerIVSTech(videojs, {
    wasmWorker: createAbsolutePath(wasmWorkerPath),
    wasmBinary: createAbsolutePath(wasmBinaryPath),
  });
  const setupPlayer = () => {
    if (!playerRef.current) {
      const player = videojs(videoRef.current, {
        autoplay: true,
        controls: true,
        
      });
     

      player.controlBar.removeChild('playToggle');
      player.controlBar.removeChild('fullscreenToggle');
      player.controlBar.removeChild('pictureInPictureToggle');


      // player.on('error', (e) => { setErrorPlayer(e.target.player.error_.message) });
      playerRef.current = player;

    }
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }

    };
  };

  useEffect(() => {
    setupPlayer();
  }, [streamUrl]);

  return (
    <div className={styles.player}>

      {/* <ErrorPlayer error={errorPlayer} /> */}
      {/* <Feature /> */}
 
      <video controls ref={videoRef} className={` ${styles.ivsplayer} video-js vjs-fill `} autoPlay muted>
        <source src={streamUrl} type="application/x-mpegURL; codecs=avc1.42E01E,mp4a.40.2" />
        <track kind="captions" label="English" default />
      </video>

    </div>

  );
};

export default IVSPlayer;
