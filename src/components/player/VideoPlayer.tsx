import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import styles from './VideoPlayer.module.css';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/sea/index.css';
import qualitySelector from 'videojs-hls-quality-selector';
import qualityLevels from 'videojs-contrib-quality-levels';

const VideoPlayer: React.FC<{ streamUrl: string }> = ({ streamUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);

  videojs.registerPlugin('hlsQualitySelector', qualitySelector);
  videojs.registerPlugin('qualityLevels', qualityLevels);

  useEffect(() => {
    const setupPlayer = () => {
      
      const playerOptions = {
        autoplay: true,
        controls: true,
        // playbackRates: [0.5, 1, 1.5, 2],
        sources: [
          {
            src: streamUrl,
            type: 'application/x-mpegURL',
          },
        ],
        liveui: true,
        fluid: true,
        errorDisplay: false,
      };

      if (!playerRef.current) {
        const player = videojs(videoRef.current, playerOptions, () => {
          console.log('Player is ready');
        });
        player.hlsQualitySelector({
          displayCurrentQuality: true,
        });

        player.qualityLevels();

        player.on('error', () => {
          const duration = player.duration();
          //if video is not live from ivs stream
          if (isNaN(duration) || duration === 0) {
            console.log('not live');
            // Stream is not live, stop loading
            player.error(null);
            player.pause();
            // player.reset()
            player.loadingSpinner.hide();
          }
        });
        // player.on('play',()=>{
        //   player.liveTracker.seekToLiveEdge()
        //   console.log('csa',player.liveTracker)
        // })\


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
    setupPlayer();
  }, [streamUrl]);

  return (
    <div className={styles.player}>
      {/* <ErrorPlayer error={errorPlayer} /> */}
      {/* <Feature /> */}

      <video
        controls
        ref={videoRef}
        className={` ${styles.ivsplayer} video-js vjs-fill streamplayer`}
        autoPlay
        muted
      >
        {/* <source src={streamUrl} type="application/x-mpegURL" /> */}
        {/* <track kind="captions" label="English C" default /> */}
      </video>
    </div>
  );
};

export default VideoPlayer;
