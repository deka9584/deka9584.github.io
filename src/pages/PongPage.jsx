import { useEffect, useMemo, useRef } from "react";
import PageContainer from "../components/PageContainer";
import { useGlobalContext } from "../context/Context";

function PongPage () {
    const { headerRef } = useGlobalContext();
    const pongContainerRef = useRef();

    useEffect(() => {
        const headerEl = headerRef?.current;
        const pongContainerEl = pongContainerRef.current;
        let observer;

        if (headerEl && pongContainerEl) {
            observer = new ResizeObserver((entries) => {
                entries.forEach(({ contentRect }) => {
                    if (contentRect.height > 0) {
                        pongContainerEl.style.setProperty("--gap-header-heigth", `${Math.round(contentRect.height)}px`);
                    }
                });
            });

            observer.observe(headerEl);
        }

        return () => observer?.disconnect();
    }, [headerRef]);

    const pongElement = useMemo(() => {
        return (
            <pong-game data-bg-color="none">
                <div className="flex justify-center px-lg size-full">
                    <canvas className="size-full object-contain" width="800" height="400"></canvas>
                </div>
        
                <div className="absolute inset-x-0 bottom-0 max-w-xl mx-auto flex flex-row justify-between px-xl py-lg backdrop-blur-sm border-t sm:border-x border-white">
                    <form action="#" className="pong-game-form">
                        <label>
                            <input type="radio" name="difficulty" value="easy" defaultChecked/>
                            <span>Facile</span>
                        </label>
                        <label>
                            <input type="radio" name="difficulty" value="normal" />
                            <span>Normale</span>
                        </label>
                        <label>
                            <input type="radio" name="difficulty" value="hard" />
                            <span>Difficile</span>
                        </label>
                        <label>
                            <input type="checkbox" name="mouseToggle" value="on" defaultChecked/>
                            <span>Mouse</span>
                        </label>
                    </form>
                    <div data-points="0"></div>
                </div>
            </pong-game>
        );
    }, []);

    return (
        <PageContainer>
            <section className="bg-black relative">
                <div className="absolute inset-x-0 w-fit mx-auto top-0 px-lg py-base backdrop-blur-sm border-b sm:border-x border-white">
                    <h1 className="font-bold text-2xl text-center uppercase">Pong</h1>
                </div>
                <div className="pong-game-container" ref={pongContainerRef}>
                    {pongElement}
                </div>
            </section>
        </PageContainer>
    );
}

export default PongPage;