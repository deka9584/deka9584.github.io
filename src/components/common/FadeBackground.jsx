function FadeBackground ({ className = "", rgb, targetSelector, children }) {
    return (
        <div className={className}>
            <fade-effect class="absolute inset-0 size-full z-10" data-color-rgb={rgb || "19,141,165"} data-target={targetSelector}>
                <canvas></canvas>
            </fade-effect>
            {children}
        </div>
    );
}

export default FadeBackground;