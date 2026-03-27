import ProjectCard from "../common/ProjectCard";
import projShipBattle from "../../assets/proj-ship-battle.png";

function ShipBattleProjCard() {
    return (
        <ProjectCard
            imgSrc={projShipBattle}
            imgAlt="Ship Battle"
            content={<>
                <h2 className="h2">Ship Battle</h2>
                <p>Ship Battle in JS (client + server)</p>
            </>}
            links={<>
                <div className="proj-card-links-left">
                    <a href="https://github.com/deka9584/shipbattle_client" target="_blank" rel="noreferrer" className="btn btn-dark btn-animated rounded-sm space-x-md">
                        <i className="bi bi-github"></i>
                        <span className="font-medium">Repo Client</span>
                    </a>
                    <a href="https://github.com/deka9584/shipbattle_server" target="_blank" rel="noreferrer" className="btn btn-dark btn-animated rounded-sm space-x-md">
                        <i className="bi bi-github"></i>
                        <span className="font-medium">Repo Server</span>
                    </a>
                </div>
                <div className="proj-card-links-right">
                    <a href="http://ships.salaandrea.altervista.org/" target="_blank" rel="noreferrer" className="btn btn-primary btn-animated rounded-sm space-x-md">
                        <span className="font-medium">Client Demo</span>
                        <i className="bi bi-box-arrow-up-right"></i>
                    </a>
                </div>
            </>}
        />
    )
}

export default ShipBattleProjCard;