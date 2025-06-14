import { useEffect } from "react";
import PageContainer from "../components/PageContainer";
import { useGlobalContext } from "../context/Context";
import FadeBackground from "../components/common/FadeBackground";

function ProjectsPage () {
    const { setFixedHeader } = useGlobalContext();

    useEffect(() => {
        setFixedHeader(true);
        return () => setFixedHeader(false);
    }, [setFixedHeader]);

    return (
        <PageContainer>
            <section className="relative p-base w-full min-h-screen bg-dark text-white flex items-center justify-center cursor-plus">
                <FadeBackground className="absolute inset-0 size-full opacity-75" targetSelector="section"/>
                <div className="relative space-y-lg z-10 text-center">
                    <h1 className="h1 uppercase">Progetti</h1>
                    <div className="inline-flex items-center gap-md">
                        <span className="w-10 h-px inline-block bg-white"></span>
                        <span className="text-xl">Pagina in costruzione</span>
                        <span className="w-10 h-px inline-block bg-white"></span>
                    </div>
                </div>
            </section>
        </PageContainer>
    );
}

export default ProjectsPage;