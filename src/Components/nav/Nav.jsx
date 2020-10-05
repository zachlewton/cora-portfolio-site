import React, { Component, useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";
import ProjectSubNav from "../projectSubNav/ProjectSubNav";

const Nav = (props) => {
  const [hidden, sethidden] = useState(true);
  const [mediumHidden, setMediumHidden] = useState(true);
  const [projectHidden, setProjectHidden] = useState(true);

  let projects = props.projects;
  console.log(projects);

  return (
    <nav className={style.sideNav}>
      <div className={style.logo}> logo</div>

      <ul className={style.navList}>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <li
          onClick={
            projectHidden
              ? () => setProjectHidden(false)
              : () => setProjectHidden(true)
          }
        >
          Projects
        </li>
        {!projectHidden && (
          <div>
            {projects.map((project) => (
              <NavLink to={`/project/${project.slug}/`}>
                {project.title.rendered}
              </NavLink>
            ))}
          </div>
        )}
        <li
          onClick={
            mediumHidden
              ? () => setMediumHidden(false)
              : () => setMediumHidden(true)
          }
        >
          Works
        </li>
        {!mediumHidden && (
          <div className={style.infoSubNav}>
            <NavLink to="/exhibitions">
              <li>Exhibitions</li>
            </NavLink>
            <NavLink to="/sculpture">
              <li>Sculpture</li>
            </NavLink>
            <NavLink to="/digital-installations">
              <li>Digital Installations</li>
            </NavLink>
            <NavLink to="/paintings">
              <li>Painting</li>
            </NavLink>
            <NavLink to="/photography">
              <li>Photography</li>
            </NavLink>
            <NavLink to="/print">
              <li>Print</li>
            </NavLink>
          </div>
        )}
        <li onClick={hidden ? () => sethidden(false) : () => sethidden(true)}>
          Info
        </li>
        {!hidden && (
          <div className={style.infoSubNav}>
            <NavLink to="/">
              <li>Resume CV</li>
            </NavLink>
            <NavLink to="/">
              <li>Bio</li>
            </NavLink>
            <NavLink to="/">
              <li>Statement</li>
            </NavLink>
            <NavLink to="/">
              <li>News</li>
            </NavLink>
            <NavLink to="/">
              <li>Architecture</li>
            </NavLink>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
