import { useEffect, useState } from "react";
import Project from "./Project";
import projectsJSON from "../projects.json";

interface Props {
    searchTerm : string;
}

const Main : React.FC<Props> = (props) => {

    return (
        <main className="main-container">
            <div className="projects-container">
                {projectsJSON.projects.map((project) => {
                    if (project.name.toLowerCase().includes(props.searchTerm.toLowerCase()) || props.searchTerm === "") {
                        return (
                            <Project
                                key={project.name}
                                projectTitle={project.name}
                                projectDescription={project.description}
                                projectLink={project.path}
                            />
                        )
                    }
                })}
            </div>
        </main>
    )
}

export default Main;