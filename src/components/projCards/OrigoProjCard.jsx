import Popover from "../common/Popover";
import VideoModal from "../modals/VideoModal";
import NiceModal from "@ebay/nice-modal-react";
import origoLogo from "../../assets/origo-logo.png";
import origoVideo from "../../assets/origo-video.mov";
import ProjectCard from "../common/ProjectCard";

function OrigoProjCard() {
    return (
        <ProjectCard
            imgSrc={origoLogo}
            imgAlt="Origo"
            content={<>
                <h2 className="h2">Origo</h2>
                <p>Website SEO and Copy tester</p>
            </>}
            links={<>
                <div className="proj-card-links-left">
                    <button type="button" onClick={() => NiceModal.show(VideoModal, { src: origoVideo })} className="btn btn-dark btn-animated rounded-sm space-x-md">
                        <i className="bi bi-play-fill"></i>
                        <span className="font-medium">Video</span>
                    </button>
                </div>
                <div className="proj-card-links-right">
                    <Popover
                        triggerContent={
                            <i className="bi bi-exclamation-circle"></i>
                        }
                        triggerClassName="btn btn-animated text-alert p-sm"
                    >
                        <p className="text-sm font-medium">
                            I servizi back-end, il dominio originale e la versione definitiva front-end del progetto sono stati disattivati. <br />
                            Il video mostra il funzionamento originale.
                        </p>
                    </Popover>
                </div>
            </>}
        />
    )
}

export default OrigoProjCard;