import ProjectCard from "../common/ProjectCard";
import projTnttag from "../../assets/proj-tnttag.png";

function TntTagProjCard() {
    return (
        <ProjectCard
            imgSrc={projTnttag}
            imgAlt="TNT TAG"
            content={<>
                <h2 className="h2">TNT TAG</h2>
                <p>Minigame plugin in Java per server Minecraft Spigot</p>
            </>}
            links={<>
                <div className="proj-card-links-left">
                    <a href="https://github.com/PereCraft/TNTTag" target="_blank" rel="noreferrer" className="btn btn-dark btn-animated rounded-sm space-x-md">
                        <i className="bi bi-github"></i>
                        <span className="font-medium">Repo</span>
                    </a>
                </div>
                <div className="proj-card-links-right">
                    <a href="https://github.com/PereCraft/TNTTag/releases" target="_blank" rel="noreferrer" className="btn btn-primary btn-animated rounded-sm space-x-md ms-auto">
                        <span className="font-medium">Releases</span>
                        <i className="bi bi-box-arrow-up-right"></i>
                    </a>
                </div>
            </>}
        />
    )
}

export default TntTagProjCard;