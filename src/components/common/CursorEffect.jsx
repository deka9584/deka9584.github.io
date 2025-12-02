import { useEffect, useRef } from "react";

function CursorEffect() {
    const element = useRef();

    useEffect(() => {
        const moveHandler = (event) => {
            if (element.current) {
                element.current.style.left = event.pageX - 4 + "px";
                element.current.style.top = event.pageY - 4 + "px";
            }
        }
        
        document.addEventListener("mousemove", moveHandler);

        return () => {
            document.removeEventListener("mousemove", moveHandler);
        }
    }, []);

    return (
        <div ref={element} className="absolute size-md rounded-full bg-white pointer-events-none opacity-50"></div>
    );
}

export default CursorEffect;