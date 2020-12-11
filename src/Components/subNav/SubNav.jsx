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
import style from './SubNav.module.css';
import ProjectTitle from '../projectTitle/ProjectTitle';
import axios from 'axios';

const SubNav = (props) => {
	const type = props.type;
	const navItems = props.navItems;
	console.log(navItems);

	const [subProjectOpen, setSubProjectOpen] = useState(false);
	const [currentSubProjectId, setCurrentSubProjectId] = useState(null);

	return (
		<div className={style.container}>
			<ul>
				{navItems.map((navItem) =>
					!navItem.gallery ? (
						<NavLink to={`/${type}/${navItem.slug}`}>
							<li>{navItem.title}</li>
						</NavLink>
					) : (
						<NavLink to={`/gallery/${navItem.slug}`}>
							<li>{navItem.title}</li>
						</NavLink>
					)
				)}
			</ul>
		</div>
	);
};

export default SubNav;
