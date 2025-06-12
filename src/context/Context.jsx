import { createContext, useContext, useEffect, useRef, useState } from "react";
import defineCustomElement from "../utils/defineCustomElement";
import FadeEffect from "../elements/FadeEffect";
import PongGame from "../elements/PongGame";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [fixedHeader, setFixedHeader] = useState(false);
    const headerRef = useRef();

    useEffect(() => {
        defineCustomElement("fade-effect", FadeEffect);
        defineCustomElement("pong-game", PongGame);
    }, []);

    return (
		<GlobalContext.Provider
            value={{
                fixedHeader,
                setFixedHeader,
                headerRef,
            }}
        >
		    {children}
		</GlobalContext.Provider>
	);
}