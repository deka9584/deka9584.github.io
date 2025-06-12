import { useEffect } from "react";

function PageContainer ({ children }) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="page-container">
            {children}
        </main>
    );
}

export default PageContainer;