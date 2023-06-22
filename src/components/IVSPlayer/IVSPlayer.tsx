import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import styles from './IVSPlayer.module.css';
import { registerIVSTech, VideoJSEvents, } from 'amazon-ivs-player';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/sea/index.css';
import vi from './1.mp4'
import au1 from './au1.mp3'

import wasmBinaryPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.wasm';
import wasmWorkerPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.js';
import Feature from './features/Feature';
import Controls from './features/Controls';

const createAbsolutePath = (assetPath: string) =>
  new URL(assetPath, document.URL).toString();

const IVSPlayer: React.FC<{ streamUrl: string }> = ({ streamUrl }) => {
  const videoRef = useRef(null);
  const playerRef = useRef<any>(null);
  registerIVSTech(videojs, {
    wasmWorker: createAbsolutePath(wasmWorkerPath),
    wasmBinary: createAbsolutePath(wasmBinaryPath),
  });

  useEffect(() => {


    const setupPlayer = async () => {
      const videoUrl = 'https://3d26876b73d7.us-west-2.playback.live-video.net/api/video/v1/us-west-2.913157848533.channel.rkCBS9iD1eyd.m3u8';
      const videourl2="https://dwpurpmwfzvap.cloudfront.net/videojs-for-github/master.m3u8";
      const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';


      if (!playerRef.current) {
        const player = videojs(videoRef.current, {
          techOrder: [ 'html5','AmazonIVS'],
          // techOrder: [ 'AmazonIVS','html5'],
        });
        console.log(player)
      

        player.src({
          src: videourl2
        });

        player.muted(true)
        


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
     <Feature/>
     {/* <Controls/> */}
      <video controls ref={videoRef} className={` ${styles.ivsplayer} video-js vjs-fill `} autoPlay muted>
        <track kind="captions" label="English" default />
      </video>
    </div>

  );
};

export default IVSPlayer;
