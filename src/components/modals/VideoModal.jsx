import NiceModal from "@ebay/nice-modal-react";
import { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import loaderSpinner from "../../assets/loader-spinner.svg";

const VideoModal = NiceModal.create(({ src }) => {
    const modal = NiceModal.useModal();
    const videoRef = useRef();
    const [isPaused, setIsPaused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const togglePlayPause = () => {
        isPaused ? videoRef.current?.play() : videoRef.current?.pause();
    }

    const showFullscreen = () => {
        videoRef.current?.requestFullscreen();
    }

    const handleLoadStart = () => {
        setError(null);
        setIsLoading(true);
    }

    const handleCanPlay = () => {
        setError(null);
        setIsLoading(false);
    }

    const handleError = () => {
        setError("Loading error");
        setIsLoading(false);
    }

    useEffect(() => {
        const keydownHandler = (event) => {
            if (event.key?.toLowerCase() === "escape") {
                modal.remove();
            } 
        }

        window.addEventListener("keydown", keydownHandler);
        return () => window.removeEventListener("keydown", keydownHandler);
    });

    return (
        <div className="fixed inset-0 size-full bg-black/75 z-30">
            <dialog className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark text-white shadow w-full max-w-3xl" open>
                <button type="button" className="video-controls absolute top-0 right-0 z-10" onClick={() => modal.remove()}>
                    <i className="bi bi-x-lg"></i>
                </button>
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
                    onCanPlayThrough={handleCanPlay}
                    onError={handleError}
                    onErrorCapture={(e) => console.log(e)}
                    autoPlay
                />
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
            </dialog>
        </div>
    );
});

export default VideoModal;