import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import styles from './IVSPlayer.module.css';
import { registerIVSQualityPlugin, registerIVSTech } from 'amazon-ivs-player';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/sea/index.css';

import wasmBinaryPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.wasm';
import wasmWorkerPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.js';

const createAbsolutePath = (assetPath: string) =>
  new URL(assetPath, document.URL).toString();

const IVSPlayer: React.FC<{ streamUrl: string }> = ({ streamUrl }) => {
  // const [errorPlayer, setErrorPlayer] = useState('')
  const videoRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  registerIVSTech(videojs, {
    wasmWorker: createAbsolutePath(wasmWorkerPath),
    wasmBinary: createAbsolutePath(wasmBinaryPath),
  });
  registerIVSQualityPlugin(videojs);


  useEffect(() => {
    const setupPlayer = () => {
      const playerOptions = {
        autoplay: true,
        controls: true,
        playbackRates: [0.5, 1, 1.5, 2],
        sources: [{
          src: streamUrl,
          type: 'application/x-mpegURL'
        }],
        liveui: true,
        fluid: true,
        errorDisplay: false,
       
      };

      if (!playerRef.current) {
        const player = videojs(videoRef.current, playerOptions, () => {
          console.log('Player is ready');
          player.liveTracker.startTracking()
        });
        player.on('error', () => {
          return <div>Sorry, the video failed to load. Please try again later.</div>;
        });
        // player.on('play', () => {
        //   console.log(player.liveTracker)
        // })




        player.controlBar.removeChild('playToggle');
        player.controlBar.removeChild('fullscreenToggle');
        player.controlBar.removeChild('pictureInPictureToggle');
        // player.controlBar.removeChild('progressControl');


        // player.on(['loadstart', 'play', 'playing', 'firstplay', 'pause', 'ended', 'adplay', 'adplaying', 'adfirstplay', 'adpause', 'adended', 'contentplay', 'contentplaying', 'contentfirstplay', 'contentpause', 'contentended', 'contentupdate', 'loadeddata', 'loadedmetadata'], function(e) {
        //   console.log('VIDEOJS player event: ',  e.type);
        // });

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
    setupPlayer();
  }, [streamUrl]);

  

  return (
    <div className={styles.player}>

      {/* <ErrorPlayer error={errorPlayer} /> */}
      {/* <Feature /> */}

      <video controls ref={videoRef} className={` ${styles.ivsplayer} video-js vjs-fill `} autoPlay muted>
        <source src={streamUrl} type="application/x-mpegURL; codecs=avc1.42E01E,mp4a.40.2" />
        <track kind="captions" label="English C" default />
      </video>

    </div>

  );
};

export default IVSPlayer;
