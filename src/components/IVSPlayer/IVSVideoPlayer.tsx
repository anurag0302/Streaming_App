import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import styles from './IVSPlayer.module.css';
import { registerIVSTech, VideoJSEvents } from 'amazon-ivs-player';
import './app2.css';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/sea/index.css';

import wasmBinaryPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.wasm';
import wasmWorkerPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.js';

const createAbsolutePath = (assetPath: string) =>
  new URL(assetPath, document.URL).toString();

const IVSVideoPlayer: React.FC<{ streamUrl: string }> = ({ streamUrl }) => {
  const videoRef = useRef(null);
  const playerRef = useRef<any>(null);
  registerIVSTech(videojs, {
    wasmWorker: createAbsolutePath(wasmWorkerPath),
    wasmBinary: createAbsolutePath(wasmBinaryPath),
  });

  useEffect(() => {


    const setupPlayer = async () => {
      const videoUrl = 'https://3d26876b73d7.us-west-2.playback.live-video.net/api/video/v1/us-west-2.913157848533.channel.rkCBS9iD1eyd.m3u8';
      const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';


      if (!playerRef.current) {
        const player = videojs(videoRef.current, {
          techOrder: ['AmazonIVS'],

        });
        const events: VideoJSEvents = player.getIVSEvents();
        const ivsPlayer = player.getIVSPlayer();
        ivsPlayer.addEventListener(events.PlayerState.PLAYING, () => {
          console.log('IVS Player is playing');
        });
       
        const track = new videojs.AudioTrack({
          id: 'https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8',
          kind: 'translation',
          label: 'Spanish',
          language: 'es',
  
        });
  
        // Add the track to the player's audio track list.
        player.audioTracks().addTrack(track);
  
        const track2 = new videojs.AudioTrack({
          id: 'https://3d26876b73d7.us-west-2.playback.live-video.net/api/video/v1/us-west-2.913157848533.channel.rkCBS9iD1eyd.m3u8',
          kind: 'translation',
          label: 'en',
          language: 'es',
  
        });
        // Add the track to the player's audio track list.
        player.audioTracks().addTrack(track2);
        // Get the current player's AudioTrackList object.
        const audioTrackList = player.audioTracks();

        audioTrackList.addEventListener('change', function () {

          // Log the currently enabled AudioTrack label.
          for (let i = 0; i < audioTrackList.length; i++) {
            const track = audioTrackList[i];
  
            if (track.enabled) {
              // videojs.log(track.id);
              player.src({
                src: track.id,
                type: 'application/x-mpegURL',
              });
              return;
            }
          }
        });

        if (!player.src()) {
          player.src({
            src: 'https://3d26876b73d7.us-west-2.playback.live-video.net/api/video/v1/us-west-2.913157848533.channel.rkCBS9iD1eyd.m3u8',
            type: 'application/x-mpegURL',
          });
        }



        player.play()
        player.volume(0.1)
        player.muted(true)
        console.log('hi')
        playerRef.current = player;

        console.log(player.audioTracks())
      }

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }

      };
    };

    setupPlayer();
  }, []);



  return (
    <div className={styles.player}>
      <video ref={videoRef} className="video-js vjs-default-skin vjs-4-3 vjs-big-play-centered " controls autoPlay>
      <track kind="captions" label="English" default />
      </video>
      {/* <button onClick={changeSource}>Change Source</button> */}

    </div>
  );
};

export default IVSVideoPlayer;
