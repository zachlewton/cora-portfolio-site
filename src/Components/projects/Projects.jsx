import React, { Component } from "react";
import axios from "axios";
import ProjectTab from "../projectTab/ProjectTab";
import style from "./Projects.module.css";

export default class Projects extends Component {
  state = {
    projects: [],
    isLoaded: false,
  };

  componentDidMount() {
    axios
      .get("/wp-json/wp/v2/project")
      .then((res) =>
        this.setState({
          projects: res.data,
          isLoaded: true,
        })
      )
      .catch((err) => console.log(err));
  }
  render() {
    const { projects, isLoaded } = this.state;

    {
      console.log(this.state.projects);
    }
    if (isLoaded) {
      return (
        <div className={style.projectsContainer}>
          {projects.map((project) => (
            <ProjectTab
              description={project.content.rendered}
              key={project.id}
              title={project.title.rendered}
              thumbnail={project.acf.thumbnail.url}
              slug={project.slug}
            />
          ))}
        </div>
      );
    }

    return null;
  }
}
