import { useNavigate } from "react-router-dom";

function GradientBtn ({ type, href, onClick, children, gradientClass = "", textClass = "" }) {
    const navigate = useNavigate();

    const clickHandler = () => {
        if (typeof onClick === "function") {
            onClick();
        }

        if (href) {
            navigate(href);
        }
    }

    return (
        <button type={type} onClick={clickHandler} className="relative group inline-block p-px leading-6 text-white bg-black shadow-2xl cursor-pointer shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
            <span className={`absolute inset-0 bg-gradient-to-r from-lightBlue to-purple p-md ${gradientClass}`.trim()}></span>
            <span className={`relative block btn ${textClass}`.trim()}>
                {children}
            </span>
        </button>
    );
}

export default GradientBtn;