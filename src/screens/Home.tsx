import React from 'react'
import IVSPlayer from '../components/IVSPlayer/IVSPlayer';
import VideoPlayer from '../components/IVSPlayer/VideoPlayer';

const videoUrl = 'https://3d26876b73d7.us-west-2.playback.live-video.net/api/video/v1/us-west-2.913157848533.channel.rkCBS9iD1eyd.m3u8';
// const videoUrl2 = "https://dwpurpmwfzvap.cloudfront.net/videojs-for-github/master.m3u8";
// const videoUrl3 = 'https://b0f49c7bd7ac.ap-south-1.playback.live-video.net/api/video/v1/ap-south-1.846769444468.channel.3vU4QnACEm5P.m3u8';
// const videoUrl4 = 'https://d41ef2825d1b.us-east-1.playback.live-video.net/api/video/v1/us-east-1.784794279319.channel.gU2okZ2oK00M.m3u8';

const Home = () => {
    // const streamUrl = 'https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8';
    return (
        <div style={{display:'flex',justifyContent:'space-evenly',flexWrap:'wrap',marginTop:'20px'}}>
            <IVSPlayer streamUrl={videoUrl} />
            <VideoPlayer streamUrl={videoUrl}/>
        </div>
    )
}

export default Home