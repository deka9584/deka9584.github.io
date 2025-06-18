import { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import loaderSpinner from "../../assets/loader-spinner.svg";

function VideoPlayer ({ src, showProgressbar = false, autoplay = false, autoHideControls = false }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isPaused, setIsPaused] = useState(!autoplay);
    const [error, setError] = useState();
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const videoRef = useRef();

    const togglePlayPause = () => {
        if (videoRef.current) {
            isPaused ? videoRef.current.play() : videoRef.current.pause();
        }
    }

    const showFullscreen = () => {
        videoRef.current?.requestFullscreen();
    }

    const handleLoadStart = () => {
        setError(null);
        setIsLoading(true);
    }

    const handleCanPlayThrough = () => {
        setError(null);
        setIsLoading(false);
    }

    const handleError = () => {
        setError("Loading error");
        setIsLoading(false);
    }

    const handleTimeUpdate = () => {
        if (!showProgressbar || !videoRef.current) return;

        const current = videoRef.current.currentTime || 0;
        const duration = videoRef.current.duration || 0;
        const percentage = (current / duration) * 100;
        setProgress(percentage);
    }

    const handleProgressClick = (event) => {
        if (!videoRef.current || isLoading) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const newTime = (clickX / rect.width) * videoRef.current.duration;
        videoRef.current.currentTime = newTime;
    }

    useEffect(() => {
        const videoEl = videoRef.current;
        
        if (!autoHideControls || !videoEl) return;

        let hideControlsTimeout;

        const scheduleHideControls = () => {
            hideControlsTimeout = setTimeout(() => {
                setShowControls(false);
            }, 1000);
        }

        const mouseMoveHandler = () => {
            setShowControls(true);
            clearTimeout(hideControlsTimeout);
            scheduleHideControls();
        }

        const touchEndHandler = () => {
            setShowControls(prev => !prev);
            clearTimeout(hideControlsTimeout);
            scheduleHideControls();
        }

        videoEl.addEventListener("pointermove", mouseMoveHandler);
        videoEl.addEventListener("touchend", touchEndHandler);

        return () => {
            videoEl.removeEventListener("mousemove", mouseMoveHandler);
            videoEl.removeEventListener("touchup", mouseMoveHandler);
        }

    }, [autoHideControls]);

    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute inset-0 size-full flex items-center justify-center">
                    <ReactSVG src={loaderSpinner} aria-label="Loading" className="size-2xl animate-spin"/>
                </div>
            )}
            {error && (
                <div className="absolute inset-0 size-full flex flex-col items-center justify-center">
                    <i className="bi bi-exclamation-circle text-alert text-2xl"></i>
                    <span className="mt-base text-sm">{error}</span>
                </div>
            )}
            <video
                src={src}
                ref={videoRef}
                onPlay={() => setIsPaused(false)}
                onPause={() => setIsPaused(true)}
                onLoadStart={handleLoadStart}
                onCanPlayThrough={handleCanPlayThrough}
                onError={handleError}
                onTimeUpdate={handleTimeUpdate}
                autoPlay={autoplay}
            />
            <div className="absolute inset-x-0 bottom-0 transition-opacity" style={{ opacity: showControls ? 1 : 0 }}>
                {showProgressbar && (
                    <div onClick={handleProgressClick} className="absolute bottom-0 inset-x-0 w-full h-sm bg-dark/50 overflow-visible" role="progressbar" aria-valuemax={100} aria-valuemin={0} aria-valuenow={progress}>
                        <div className="absolute h-full bg-white" style={{ width: `${progress}%` }}></div>
                    </div>
                )}
                <button type="button" onClick={togglePlayPause} className="video-controls absolute bottom-0 left-0 z-10">
                    {isPaused ? (
                        <i className="bi bi-play"></i>
                    ) : (
                        <i className="bi bi-pause"></i>
                    )}
                </button>
                <button type="button" onClick={showFullscreen} className="video-controls absolute bottom-0 right-0 z-10">
                    <i className="bi bi-arrows-fullscreen"></i>
                </button>
            </div>

        </div>
    )
}

export default VideoPlayer;