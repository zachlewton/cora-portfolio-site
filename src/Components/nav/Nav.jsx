import React, { Component, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.css';
import SubNav from '../subNav/SubNav';
import axios from 'axios';
import SubNavChildNav from '../subNavChildNav/SubNavChildNav';
const Nav = (props) => {
	const [subNavActive, setSubNavActive] = useState(false);
	const [subNavType, setSubNavType] = useState('');
	const [subNavChildActive, setSubNavChildActive] = useState(false);
	const [subNavChildType, setSubNavChildType] = useState('');
	const [subItems, setSubItems] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [projects, setProjects] = useState([]);
	const [works, setWorks] = useState([]);
	const [info, setInfo] = useState([]);

	console.log('subNavType:' + subNavType);
	console.log('subNavChildType:' + subNavChildType);

	useEffect(() => {
		axios
			.get(`http://localhost:8000/wp-json/custom-api/v1/get_nav_items`)
			.then((res) => {
				console.log(res.data);
				setProjects(res.data.projects);
				setWorks(res.data.works);
				setInfo(res.data.info);
			})
			.then(() => setLoaded(true));
	}, []);

	const active = {
		color: 'red',
	};

	const subNav = (type) => {
		setSubNavActive(true);
		setSubNavType(type);

		setSubNavChildActive(false);
		setSubNavChildType('');
	};

	const subNavChild = (type, subs) => {
		setSubNavChildActive(true);
		setSubNavChildType(type);
		setSubItems(subs);
	};

	return (
		<nav className={style.sideNav}>
			<ul className={style.navList}>
				<li onClick={() => subNav('info')}>Info</li>

				<NavLink exact activeStyle={active} to="/projects">
					<li onClick={() => subNav('projects')}>Projects</li>
				</NavLink>
				<NavLink exact activeStyle={active} to="/works">
					<li onClick={() => subNav('works')}>Works</li>
				</NavLink>
			</ul>

			{subNavActive && (
				<SubNav
					navItems={
						subNavType === 'projects'
							? projects
							: subNavType === 'info'
							? info
							: works
					}
					type={subNavType}
					subNavChild={subNavChild}
				/>
			)}

			{subNavChildActive && (
				<SubNavChildNav type={subNavType} subItems={subItems} />
			)}
		</nav>
	);
};

export default Nav;
