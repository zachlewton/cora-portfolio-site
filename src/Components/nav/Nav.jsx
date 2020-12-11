import React, { Component, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.css';
import SubNav from '../subNav/SubNav';
import axios from 'axios';

const Nav = (props) => {
	const [subNavActive, setSubNavActive] = useState(false);
	const [subNavType, setSubNavType] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [projects, setProjects] = useState([]);
	const [works, setWorks] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:8000/wp-json/custom-api/v1/get_nav_items`)
			.then((res) => {
				console.log(res.data);
				setProjects(res.data.projects);
				setWorks(res.data.works);
			})
			.then(() => setLoaded(true));
	}, []);

	const subNav = (type) => {
		setSubNavActive(true);
		setSubNavType(type);
	};

	return (
		<nav className={style.sideNav}>
			<ul className={style.navList}>
				<NavLink to="/projects">
					<li onClick={() => subNav('projects')}>Projects</li>
				</NavLink>
				<NavLink to="/works">
					<li onClick={() => subNav('works')}>Works</li>
				</NavLink>
			</ul>

			{subNavActive && (
				<SubNav
					navItems={subNavType === 'projects' ? projects : works}
					type={subNavType}
				/>
			)}
		</nav>
	);
};

export default Nav;
