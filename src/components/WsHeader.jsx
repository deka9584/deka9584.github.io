import { Link } from "react-router-dom";
import logo from "../assets/logo_white.svg";
import { useGlobalContext } from "../context/Context";
import { ReactSVG } from "react-svg";
import RouteMap from "../constants/RouteMap";
import { useEffect } from "react";

function WsHeader () {
    const { fixedHeader, headerRef } = useGlobalContext();
    const style = {};

    if (fixedHeader) {
        style.position = "fixed";
    }

    useEffect(() => {
        let lastScrollTop = 0;

        const scrollHandler = () => {
            const headerEl = headerRef.current;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollingDown = scrollTop > lastScrollTop;

            if (headerEl) {
                headerEl.style.top = scrollingDown ? `-${headerEl.offsetHeight}px` : '0';
            }

            lastScrollTop = scrollTop;
        }

        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [headerRef]);

    return (
        <header className="ws-header" style={style} ref={headerRef}>
            <nav className="flex flex-row justify-between items-center">
                <div className="border-r border-dark bg-black px-lg sm:px-xl lg:px-2xl py-base">
                    <Link to={RouteMap.HOME} aria-label="Home">
                        <ReactSVG src={logo} className="w-44 sm:w-52"/>
                    </Link>
                </div>
                <ul className="flex-1 px-xl hidden sm:flex gap-lg">
                    <li>
                        <Link to={RouteMap.HOME} className="nav-link">Home</Link>
                    </li>
                    <li>
                        <Link to={RouteMap.PROJECTS} className="nav-link">Progetti</Link>
                    </li>
                </ul>
                <div className="flex items-center gap-lg px-lg sm:px-xl lg:px-2xl">
                    <a href="https://github.com/deka9584" target="_blank" rel="noreferrer">
                        <i className="bi bi-github" aria-label="GitHub"></i>
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default WsHeader;