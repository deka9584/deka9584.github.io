import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/Context";
import FadeBackground from "../components/common/FadeBackground";
import GradientBtn from "../components/common/GradientBtn";
import PageContainer from "../components/PageContainer";
import RouteMap from "../constants/RouteMap";
import CardSlider from "../components/common/CardSlider";
import codeHeroBg from "../assets/code-hero-bg.png";
import skillsList from "../resources/skillList.json";
import TntTagProjCard from "../components/projCards/TntTagProjCard";
import SnakeProjCard from "../components/projCards/SnakeProjCard";
import OrigoProjCard from "../components/projCards/OrigoProjCard";
import ShipBattleProjCard from "../components/projCards/ShipBattleProjCard";

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
                    <div className="code-hero-bg pointer-events-none select-none">
                        <img src={codeHeroBg} alt=""/>
                    </div>
                </FadeBackground>
                <div className="relative space-y-lg z-10 select-none">
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
                        <SnakeProjCard/>
                        <OrigoProjCard/>
                        <TntTagProjCard/>
                        <ShipBattleProjCard/>
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