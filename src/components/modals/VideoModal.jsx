import NiceModal from "@ebay/nice-modal-react";
import { useEffect } from "react";
import VideoPlayer from "../common/VideoPlayer";

const VideoModal = NiceModal.create(({ src }) => {
    const modal = NiceModal.useModal();

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
                <VideoPlayer
                    src={src}
                    showProgressbar
                    autoplay
                />
            </dialog>
        </div>
    );
});

export default VideoModal;