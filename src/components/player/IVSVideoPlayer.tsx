import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import styles from './IVSVideoPlayer.module.css';
import {
  registerIVSQualityPlugin,
  registerIVSTech,
  VideoJSEvents,
} from 'amazon-ivs-player';
import 'video.js/dist/video-js.css';

import wasmBinaryPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.wasm';
import wasmWorkerPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.js';

const createAbsolutePath = (assetPath: string) =>
  new URL(assetPath, document.URL).toString();

const IVSVideoPlayer: React.FC<{ streamUrl: string }> = ({ streamUrl }) => {
  const videoRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  registerIVSTech(videojs, {
    wasmWorker: createAbsolutePath(wasmWorkerPath),
    wasmBinary: createAbsolutePath(wasmBinaryPath),
  });
  registerIVSQualityPlugin(videojs);

  useEffect(() => {
    const setupPlayer = async () => {
      if (!playerRef.current) {
        const player = videojs(videoRef.current, {
          techOrder: ['AmazonIVS'],
        });
        const events: VideoJSEvents = player.getIVSEvents();
        const ivsPlayer = player.getIVSPlayer();
        ivsPlayer.addEventListener(events.PlayerState.PLAYING, () => {
          console.log('IVS Player is playing');
        });
        ivsPlayer.addEventListener(events.PlayerState.ENDED, () => {
          console.log('IVS Player is Ended');
        });
        ivsPlayer.addEventListener(player.getIVSEvents().PlayerEventType.TEXT_METADATA_CUE,
          function (cue) {
        console.log('Timed metadata: ', cue.text);
      });
      

        player.controlBar.removeChild('pictureInPictureToggle');
        player.controlBar.removeChild('fullscreenToggle');
        player.controlBar.removeChild('playToggle');
        player.controlBar.addChild('audioTrackButton');
        player.ready(() => {
          player.src(streamUrl);
        });
        player.enableIVSQualityPlugin();
        // player.volume(0.1)
        player.muted(true);
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
    <div className={styles.player} style={{backgroundColor:'green'}}>
      <video
        ref={videoRef}
        className={`video-js vjs-fill streamplayer`}
        controls
        autoPlay
        muted
      >
        <track kind="captions" label="English" default />
      </video>
    </div>
  );
};

export default IVSVideoPlayer;
