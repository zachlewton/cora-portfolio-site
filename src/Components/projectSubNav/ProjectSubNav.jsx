import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	NavLink,
	Outlet,
	useParams,
	useLocation,
} from 'react-router-dom';
import style from './ProjectSubNav.module.css';
import ProjectTitle from '../projectTitle/ProjectTitle';
import axios from 'axios';

const ProjectSubNav = (props) => {
	let projects = props.projects;

	const [subProjectOpen, setSubProjectOpen] = useState(false);
	const [currentSubProjectId, setCurrentSubProjectId] = useState(null);

	const projectClick = (id) => {
		setCurrentSubProjectId(id);
		setSubProjectOpen(true);
	};

	return (
		<div>
			<div>
				{projects.map((project) => (
					<div key={project.id}>
						{project.id === currentSubProjectId ? (
							<ProjectTitle
								open={true}
								projectClick={projectClick}
								project={project}
							/>
						) : (
							<ProjectTitle
								open={false}
								projectClick={projectClick}
								project={project}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectSubNav;