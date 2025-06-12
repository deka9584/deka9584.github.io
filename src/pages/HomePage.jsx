import { Link } from "react-router-dom";
import FadeBackground from "../components/common/FadeBackground";
import GradientBtn from "../components/common/GradientBtn";
import PageContainer from "../components/PageContainer";
import codeHeroBg from "../assets/code-hero-bg.png";
import RouteMap from "../constants/RouteMap";
import { useGlobalContext } from "../context/Context";
import { useEffect, useRef } from "react";
import CardSlider from "../components/common/CardSlider";
import ProjectCard from "../components/common/ProjectCard";
import Popover from "../components/common/Popover";

import projJsSnake from "../assets/proj-js-snake.png";
import origoLogo from "../assets/origo-logo.png";
import projShipBattle from "../assets/proj-ship-battle.png";
import projTnttag from "../assets/proj-tnttag.png";

function HomePage () {
    const { setFixedHeader } = useGlobalContext();
    const featuredRef = useRef();

    useEffect(() => {
        setFixedHeader(true);
        return () => setFixedHeader(false);
    }, [setFixedHeader]);

    return (
        <PageContainer>
            <section className="relative p-base w-full min-h-screen bg-black text-white flex items-center justify-center cursor-plus">
                <FadeBackground className="absolute inset-0 size-full opacity-75" targetSelector="section">
                    <div className="code-hero-bg">
                        <img src={codeHeroBg} alt=""/>
                    </div>
                </FadeBackground>
                <div className="relative space-y-lg z-10">
                    <div className="border-current border-l flex flex-col px-2xl pt-6 gap-1">
                        <h1 className="text-2xl font-bold">
                            Andrea Sala
                        </h1>
                        <h2 className="text-sm font-normal">
                            Full-Stack Developer
                        </h2>
                        <span className="text-base font-medium">
                            Web Portfolio
                        </span>
                    </div>
                    <div className="flex flex-wrap justify-start gap-md px-2xl">
                        <button type="button" onClick={() => featuredRef.current?.scrollIntoView({ behavior: "smooth" })} className="btn btn-primary btn-animated space-x-md shadow font-semibold">
                            <span>In evidenza</span>
                            <i className="bi bi-arrow-down"></i>
                        </button>
                        <GradientBtn textClass="space-x-md bg-black/50 font-semibold" gradientClass="from-lightBlue to-purple opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <span>Progetti</span>
                            <i className="bi bi-arrow-right"></i>
                        </GradientBtn>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 m-xl z-10">
                    <Link to={RouteMap.PONG} className="btn bg-black/50 rounded-md">
                        <i className="bi bi-joystick"></i>
                    </Link>
                </div>
            </section>
            <div className="py-12">
                <section className="py-12" ref={featuredRef}>
                    <h2 className="font-bold px-6 pb-12 text-2xl text-center uppercase">In evidenza</h2>
                    <div className="px-xl max-w-7xl mx-auto">
                        <CardSlider>
                            <ProjectCard
                                imgSrc={projJsSnake}
                                imgAlt="JS Snake"
                                content={<>
                                    <h2 className="h2">JS Snake</h2>
                                    <p>Snake game in JavaScript</p>
                                </>}
                                links={<>
                                    <a href="https://github.com/deka9584/JS-SnakeGame" target="_blank" rel="noreferrer" className="btn btn-dark btn-animated rounded-md space-x-md">
                                        <i class="bi bi-github"></i>
                                        <span className="font-medium">Repo</span>
                                    </a>
                                    <a href="http://snake.salaandrea.altervista.org/" target="_blank" rel="noreferrer" className="btn btn-primary btn-animated rounded-md space-x-md ms-auto">
                                        <span className="font-medium">Live</span>
                                        <i className="bi bi-box-arrow-up-right"></i>
                                    </a>
                                </>}
                            />
                            <ProjectCard
                                imgSrc={origoLogo}
                                imgAlt="Origo"
                                content={<>
                                    <h2 className="h2">Origo</h2>
                                    <p>Website SEO and Copy tester</p>
                                </>}
                                links={<>
                                    <button type="button" className="btn btn-dark btn-animated rounded-md space-x-md">
                                        <i className="bi bi-play-fill"></i>
                                        <span className="font-medium">Video</span>
                                    </button>
                                    <div className="ms-auto">
                                        <Popover
                                            triggerContent={
                                                <i className="bi bi-exclamation-circle"></i>
                                            }
                                            triggerClassName="btn btn-animated text-alert"
                                        >
                                            <p className="text-sm font-medium">
                                                I servizi back-end, il dominio originale e la versione definitiva front-end del progetto sono stati disattivati. <br />
                                                Il video mostra il funzionamento originale.
                                            </p>
                                        </Popover>
                                    </div>
                                    <a href="http://origo.salaandrea.altervista.org/" target="_blank" rel="noreferrer" className="btn btn-primary btn-animated rounded-md space-x-md">
                                        <span className="font-medium">FE Demo</span>
                                        <i className="bi bi-box-arrow-up-right"></i>
                                    </a>
                                </>}
                            />
                            <ProjectCard
                                imgSrc={projTnttag}
                                imgAlt="TNT TAG"
                                content={<>
                                    <h2 className="h2">TNT TAG</h2>
                                    <p>Minigame plugin in Java per server Minecraft Spigot</p>
                                </>}
                                links={<>
                                    <a href="https://github.com/PereCraft/TNTTag" target="_blank" rel="noreferrer" className="btn btn-dark btn-animated rounded-md space-x-md">
                                        <i class="bi bi-github"></i>
                                        <span className="font-medium">Repo</span>
                                    </a>
                                    <a href="https://github.com/PereCraft/TNTTag/releases" target="_blank" rel="noreferrer" className="btn btn-primary btn-animated rounded-md space-x-md ms-auto">
                                        <span className="font-medium">Releases</span>
                                        <i className="bi bi-box-arrow-up-right"></i>
                                    </a>
                                </>}
                            />
                            <ProjectCard
                                imgSrc={projShipBattle}
                                imgAlt="Ship Battle"
                                content={<>
                                    <h2 className="h2">Ship Battle</h2>
                                    <p>Ship Battle in JS (client + server)</p>
                                </>}
                                links={<>
                                    <a href="https://github.com/deka9584/shipbattle_client" target="_blank" rel="noreferrer" className="btn btn-dark btn-animated rounded-md space-x-md">
                                        <i class="bi bi-github"></i>
                                        <span className="font-medium">Repo Client</span>
                                    </a>
                                    <a href="https://github.com/deka9584/shipbattle_server" target="_blank" rel="noreferrer" className="btn btn-dark btn-animated rounded-md space-x-md">
                                        <i class="bi bi-github"></i>
                                        <span className="font-medium">Repo Server</span>
                                    </a>
                                    <a href="http://ships.salaandrea.altervista.org/" target="_blank" rel="noreferrer" className="btn btn-primary btn-animated rounded-md space-x-md ms-auto">
                                        <span className="font-medium">Client Demo</span>
                                        <i className="bi bi-box-arrow-up-right"></i>
                                    </a>
                                </>}
                            />
                        </CardSlider>
                    </div>
                </section>

                {/* <section className="py-12">
                    <h2 className="font-bold px-6 pb-12 text-2xl text-center uppercase">Ultimi progetti</h2>
                    <div className="s-wrapper max-w-7xl">

                    </div>
                </section> */}
            </div>
        </PageContainer>
    );
}

export default HomePage;