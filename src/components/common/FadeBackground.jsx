function FadeBackground ({ className = "", rgb, rgbClick, clickChangeColor, targetSelector, children }) {
    return (
        <div className={className}>
            <fade-effect class="absolute inset-0 size-full z-10" data-color-rgb={rgb} data-color-rgb-click={rgbClick} data-click-change-color={clickChangeColor} data-target={targetSelector}>
                <canvas></canvas>
            </fade-effect>
            {children}
        </div>
    );
}

export default FadeBackground;