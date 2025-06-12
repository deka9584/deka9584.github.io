function ProjectCard ({ imgSrc = "", imgAlt = "", content, links }) {
    return (
        <div className="h-full flex flex-col bg-darkGray shadow">
            <figure className="h-64 bg-gray-300">
                <img src={imgSrc} alt={imgAlt} className="size-full object-cover" />
            </figure>
            <div className="p-lg flex-1 text-sm space-y-base">
                {content}
            </div>
            {links && (
                <div className="pb-lg px-lg flex flex-wrap justify-between items-center gap-base">
                    {links}
                </div>
            )}
        </div>
    );
}

export default ProjectCard;