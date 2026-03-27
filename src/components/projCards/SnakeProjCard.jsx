import ProjectCard from "../common/ProjectCard";
import projJsSnake from "../../assets/proj-js-snake.png";

function SnakeProjCard() {
    return (
        <ProjectCard
            imgSrc={projJsSnake}
            imgAlt="JS Snake"
            content={<>
                <h2 className="h2">JS Snake</h2>
                <p>Snake game in JavaScript</p>
            </>}
            links={<>
                <div className="proj-card-links-left">    
                    <a href="https://github.com/deka9584/JS-SnakeGame" target="_blank" rel="noreferrer" className="btn btn-dark btn-animated rounded-sm space-x-md">
                        <i className="bi bi-github"></i>
                        <span className="font-medium">Repo</span>
                    </a>
                </div>
                <div className="proj-card-links-right">
                    <a href="http://snake.salaandrea.altervista.org/" target="_blank" rel="noreferrer" className="btn btn-primary btn-animated rounded-sm space-x-md ms-auto">
                        <span className="font-medium">Live</span>
                        <i className="bi bi-box-arrow-up-right"></i>
                    </a>
                </div>
            </>}
        />
    );
}

export default SnakeProjCard;