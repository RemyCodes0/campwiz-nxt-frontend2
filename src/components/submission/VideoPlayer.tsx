import { useMemo } from 'react';
type VideoAppProps = {
    src: string;
    poster: string;
    height: number;
    width: number
    onPosterLoaded?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void
}

const VideoApp = ({ src, poster, height, width, onPosterLoaded }: VideoAppProps) => {
    // const parentRef = useRef<HTMLDivElement>(null)
    const calculatedWidth = useMemo(() => {
        if (width / height > 9 / 16) {
            return '100%';
        }
        let windowheight = 500, windowwidth = 641;
        if (typeof window !== 'undefined') {
            windowheight = window.innerHeight * 5 / 6 * 0.9// parseInt(c.height.replace('px', ''))
            windowwidth = window.innerWidth * 0.6 // parseInt(c.width.replace('px', ''))
        }
        let calculatedHeight = windowheight, computedWidth = windowwidth;
        // try to fit width first
        calculatedHeight = windowwidth * height / width
        if (calculatedHeight > windowheight) {
            calculatedHeight = windowheight
            computedWidth = windowheight * width / height
        }
        return `${computedWidth}px`;

    }, [height, width])
    return (
        <div style={{ maxHeight: '90%', maxWidth: '100%', margin: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <video
                controls={true}
                // ref={parentRef}
                src={src}
                onError={(err) => {
                    console.error(err);
                }}
                style={{ maxHeight: '100%', maxWidth: calculatedWidth, position: 'relative', }}
                playsInline
                crossOrigin='anonymous'
            >
                <img
                    src={poster}
                    // placeholder="blur"
                    alt="Some peeps doing something awesome"
                    onLoad={onPosterLoaded}
                />
            </video>
        </div>
    );
}
export default VideoApp;