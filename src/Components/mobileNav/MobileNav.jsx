import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProjectSubNav from '../projectSubNav/ProjectSubNav';
import { NavLink } from 'react-router-dom';

const MobileNav = () => {
	const [hidden, sethidden] = useState(true);
	const [mediumHidden, setMediumHidden] = useState(true);
	const [projectHidden, setProjectHidden] = useState(true);
	const [loaded, setLoaded] = useState(false);
	const [projects, setProjects] = useState({});
	const [medium, setMedium] = useState({});
	const [subProjects, setSubProjects] = useState({});
	const [subProjectOpen, setSubProjectOpen] = useState(false);

	useEffect(() => {
		axios
			.get(`http://localhost:8000/wp-json/custom-api/v1/get_nav_items`)
			.then((res) => {
				console.log(res.data);
				setMedium(res.data[1].works);
				setProjects(res.data[0].projects);
			})
			.then(() => setLoaded(true));
	}, []);

	const raiseClick = () => {
		setProjectHidden(true);
	};

	return (
		<nav>
			<ul>
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
					<ProjectSubNav
						projects={projects}
						onClick={() => raiseClick}
						subProjectOpen={subProjectOpen}
						subProjects={subProjects}
					/>
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
					<div>
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
					<div>
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

export default MobileNav;
