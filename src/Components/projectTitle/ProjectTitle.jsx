import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	NavLink,
	Outlet,
	useParams,
	useLocation,
} from 'react-router-dom';

import SubProjectLinks from '../subProjectLinks/SubProjectLinks';

const ProjectTitle = (props) => {
	const project = props.project;
	const [subProjects, setSubProjects] = useState({});

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/wp-json/custom-api/v1/sub_projects?slug=${project.slug}`
			)
			.then((res) => {
				console.log(res.data);
				setSubProjects(res.data);
			});
		// .then(() => setCurrentSubProjectId(id))
		// .then(() => setSubProjectOpen(true));
	}, []);

	return (
		<div>
			<NavLink to={`/project/${project.slug}/`} onClick={props.handleClick}>
				<div
					onClick={() => {
						props.projectClick(project.id);
					}}
				>
					{project.title}
				</div>
			</NavLink>

			{props.open ? (
				<SubProjectLinks projectSlug={project.slug} subProjects={subProjects} />
			) : null}
		</div>
	);
};

export default ProjectTitle;
