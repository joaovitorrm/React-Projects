interface Props {
    projectTitle: string;
    projectDescription: string;
    projectLink: string;
}

const Project : React.FC<Props> = (props) => {
    return (
        <div className="project">
            <h2 className="project-title">{props.projectTitle}</h2>
            <p className="project-description">{props.projectDescription}</p>
            <span><a href={props.projectLink} className="project-link">Link</a></span>
        </div>
    )
}

export default Project;