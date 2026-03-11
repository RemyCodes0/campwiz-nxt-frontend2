import React, { useEffect, useRef } from 'react';
// import type H5AudioPlayer from 'react-h5-audio-player';
// import AudioPlayerRaw from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS
import AudioSpectrum from 'react-audio-spectrum';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';

type AudioAppProps = {
    src: string;
    title: string;
    author: string;
    onPosterLoaded?: () => void
}
let windowWidth = 400;
if (typeof window !== "undefined") {
    // Client-side-only code
    windowWidth = window.innerWidth;
}
// export const AudioApp = ({ src, onPosterLoaded }: AudioAppProps) => {
//     const audioRef = createRef<H5AudioPlayer>();
//     const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
//     useEffect(() => {
//         const audio = audioRef.current?.audio.current;
//         if (!audio) {
//             return;
//         }
//         setAudio(audio);
//     }, [audioRef, src]);
//     return (<> {audio && <AudioSpectrum
//         id="audio-canvas4"
//         height={200}
//         width={windowWidth}
//         audioEle={audio}
//         meterWidth={10}


//         capColor={'green'}
//         capHeight={2}
//         meterCount={128}
//         meterColor={[
//             { stop: 0, color: '#0f0' },
//             { stop: 0.5, color: '#0CD7FD' },
//             { stop: 1, color: 'red' }
//         ]}
//         gap={4}
//     />}
//         <AudioPlayerRaw
//             src={src}
//             ref={audioRef}
//             crossOrigin='anonymous'
//             showJumpControls={false}
//             showSkipControls={false}
//             onLoadedData={onPosterLoaded}
//         />
//     </>);
// }


function AudioPlayer({ src, title, author, onPosterLoaded }: AudioAppProps) {
    const theme = useTheme();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [mAudio, setAudio] = React.useState<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = React.useState(false);
    useEffect(() => {
        const audio = audioRef.current//?.audio.current;
        if (!audio) {
            return;
        }
        setAudio(audio);
        const onLoadCallback = () => {
            console.log('Audio loaded');
            if (onPosterLoaded) {
                onPosterLoaded();
            }
        }
        audio.onloadeddata = onLoadCallback;
        audio.onpause = () => {
            setPlaying(false);
        }
        return () => {
            audio.onloadeddata = null; // Cleanup the event listener
        }
    }, [audioRef, onPosterLoaded]);
    useEffect(() => {
        if (mAudio) {
            setPlaying(false);
        }
    }, [mAudio, src]);
    return (
        <Card sx={{ display: 'flex' }}>
            <audio ref={audioRef} src={src} crossOrigin="anonymous"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        {author}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton aria-label="play/pause" onClick={() => {
                        if (mAudio) {
                            if (mAudio.paused) {
                                mAudio.play();
                            } else {
                                mAudio.pause();
                            }
                        }
                    }}>
                        {!playing ? <PlayArrowIcon sx={{ height: 38, width: 38 }} /> : <PauseIcon sx={{ height: 38, width: 38 }} />}
                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </Box>
            </Box>
            {mAudio && <AudioSpectrum
                id="audio-canvas4"
                height={200}
                width={windowWidth}
                audioEle={mAudio}
                meterWidth={10}
                capColor={'#5DADE2'}
                capHeight={1}
                meterCount={128}
                meterColor={[
                    { stop: 0, color: '#FFA500' },
                    { stop: 0.5, color: '#5DADE2' },
                    { stop: 1, color: '#00FFFF' }
                ]}
                gap={4}
            />
            }
        </Card>
    );
}


export default AudioPlayer
