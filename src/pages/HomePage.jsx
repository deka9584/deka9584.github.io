import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/Context";
import FadeBackground from "../components/common/FadeBackground";
import GradientBtn from "../components/common/GradientBtn";
import PageContainer from "../components/PageContainer";
import RouteMap from "../constants/RouteMap";
import CardSlider from "../components/common/CardSlider";
import ProjectCard from "../components/common/ProjectCard";
import Popover from "../components/common/Popover";
import VideoModal from "../components/modals/VideoModal";
import NiceModal from "@ebay/nice-modal-react";

import codeHeroBg from "../assets/code-hero-bg.png";
import projJsSnake from "../assets/proj-js-snake.png";
import origoLogo from "../assets/origo-logo.png";
import projShipBattle from "../assets/proj-ship-battle.png";
import projTnttag from "../assets/proj-tnttag.png";
import origoVideo from "../assets/origo-video.mov";

import skillsList from "../resources/skillList.json";

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
                <FadeBackground className="absolute inset-0 size-full opacity-75" clickChangeColor={true} targetSelector="section">
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
                        <GradientBtn type="button" href={RouteMap.PROJECTS} textClass="space-x-md bg-black/50 font-semibold" gradientClass="from-lightBlue to-purple opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <span>Progetti</span>
                            <i className="bi bi-arrow-right"></i>
                        </GradientBtn>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 m-xl z-10">
                    <Link to={RouteMap.PONG} className="btn bg-black/50 rounded-sm">
                        <i className="bi bi-joystick"></i>
                    </Link>
                </div>
            </section>
            <section className="py-12" ref={featuredRef}>
                <h2 className="h1 px-6 mb-12 text-center uppercase">In evidenza</h2>
                <div className="px-xl max-w-7xl mx-auto">
                    <CardSlider className="select-none" loop navigation>
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
                    </CardSlider>
                </div>
            </section>
            <section className="py-12">
                <h2 className="h1 px-6 mb-12 text-center uppercase">Skills</h2>
                <div className="px-xl max-w-7xl mx-auto space-y-20">
                    {skillsList.map((group, i) => (
                        <div key={i} className="relative flex flex-col sm:flex-row">
                            <div className="flex-1 sm:sticky sm:top-20 py-xl h-full">
                                <h3 className="text-3xl text-center sm:text-start">
                                    <span className="border-b border-white">{group.name}</span>
                                </h3>
                            </div>
                            <div className="flex-1">
                                <ul>
                                    {group.items.map((item, j) => (
                                        <li key={j} className="px-lg py-xl border-t border-darkGray last:border-b text-xl group">
                                            <span className="opacity-75 sm:group-hover:opacity-100">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </PageContainer>
    );
}

export default HomePage;