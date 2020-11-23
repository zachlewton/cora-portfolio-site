import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	NavLink,
	Outlet,
	useParams,
	useLocation,
	useRouteMatch,
} from 'react-router-dom';

const SubProjectLinks = (props) => {
	const subProjects = props.subProjects;
	const location = useLocation();

	return (
		<div>
			{subProjects.map((subProject) => (
				<NavLink
					to={{
						pathname: `/project/${props.projectSlug}/${subProject.slug}`,
					}}
				>
					{subProject.title}
				</NavLink>
			))}
		</div>
	);
};

export default SubProjectLinks;
