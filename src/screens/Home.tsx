import React from 'react'
import IVSPlayer from '../components/IVSPlayer/IVSPlayer';
import TextContainer from '../components/textContainer/TextContainer';
import IVSVideoPlayer from '../components/IVSPlayer/IVSVideoPlayer';
import VideoPlayer from '../components/IVSPlayer/VideoPlayer';

const Home = () => {
    const streamUrl = 'https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8';
    return (
        <div style={{display:'flex',justifyContent:'space-evenly',flexWrap:'wrap',marginTop:'20px'}}>
            <IVSPlayer streamUrl={streamUrl} />
            {/* <VideoPlayer/> */}
            
            {/* <IVSVideoPlayer streamUrl={streamUrl} /> */}
            {/* <TextContainer /> */}
        </div>
    )
}

export default Home