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

	const [subProjects, setSubProjects] = useState({});
	const [subProjectOpen, setSubProjectOpen] = useState(false);
	const [currentSubProjectId, setCurrentSubProjectId] = useState(null);

	const projectClick = (slug, id) => {
		axios
			.get(
				`http://localhost:8000/wp-json/custom-api/v1/sub_projects?slug=${slug}`
			)
			.then((res) => {
				console.log(res.data);
				setSubProjects(res.data);
			})
			.then(() => setCurrentSubProjectId(id))
			.then(() => setSubProjectOpen(true));
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
								subProjects={subProjects}
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
