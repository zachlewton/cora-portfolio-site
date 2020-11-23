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

import SubProjectLinks from '../subProjectLinks/SubProjectLinks';

const ProjectTitle = (props) => {
	const project = props.project;

	// const handleProjectClick = (slug) => {
	// 	props.projectClick(slug.target.value);
	// };

	return (
		<div>
			<NavLink to={`/project/${project.slug}/`} onClick={props.handleClick}>
				<div
					onClick={() => {
						props.projectClick(project.slug, project.id);
					}}
				>
					{project.title}
				</div>
			</NavLink>

			{props.open ? (
				<SubProjectLinks
					projectSlug={project.slug}
					subProjects={props.subProjects}
				/>
			) : null}
		</div>
	);
};

export default ProjectTitle;
