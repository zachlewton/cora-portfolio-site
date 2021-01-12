import React, { Component, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import style from './Nav.module.css';
import SubNav from '../subNav/SubNav';
import axios from 'axios';
import SubNavChildNav from '../subNavChildNav/SubNavChildNav';
const Nav = (props) => {
	const [subNavType, setSubNavType] = useState('');
	const [subNavActive, setSubNavActive] = useState(false);
	const [subNavChildActive, setSubNavChildActive] = useState(false);
	const [subNavChildType, setSubNavChildType] = useState('');
	const [subItems, setSubItems] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [projects, setProjects] = useState([]);
	const [works, setWorks] = useState([]);
	const [info, setInfo] = useState([]);
	const [activeLink, setActiveLink] = useState('');

	const location = useLocation();

	const params = useParams();

	// function setNavs() {
	// 	if (location.pathname.match('/' || []).length >= 1) {
	// 		setSubNavActive(true);

	// 		// if (location.pathname.match('/' || []).length >= 2) {
	// 		// 	setSubNavChildActive(true);
	// 		// } else {
	// 		// 	setSubNavChildActive(true);
	// 		// }
	// 	} else {
	// 		setSubNavActive(false);
	// 	}
	// }

	useEffect(() => {
		axios
			.get(`https://artportfoliocora.com/wp-json/custom-api/v1/get_nav_items`)
			.then((res) => {
				setProjects(res.data.projects);
				setWorks(res.data.works);
				setInfo(res.data.info);
			})
			.then(() => {
				setLoaded(true);
			});
	}, []);

	// const active = {
	// 	color: '#925223',
	// 	fontFamily: 'MYRIADPRO-BOLD',
	// };

	const subNav = (type) => {
		setSubNavActive(true);
		setSubNavType(type);

		setSubNavChildActive(false);
		setSubNavChildType('');
		setActiveLink(type);
	};

	const subNavChild = (type, subs) => {
		setSubNavChildActive(true);
		setSubNavChildType(type);
		setSubItems(subs);
	};

	return (
		<nav className={style.sideNav}>
			<ul className={style.navList}>
				<li
					className={location.pathname.startsWith('/info') && style.active}
					onClick={() => subNav('info')}
				>
					Info
				</li>

				{/* <NavLink exact activeStyle={active} to="/projects">
					<li onClick={() => subNav('projects')}>Projects</li>
				</NavLink>
				<NavLink exact activeStyle={active} to="/works">
					<li onClick={() => subNav('works')}>Works</li>
				</NavLink> */}

				<NavLink exact activeClassName={style.active} to="/projects">
					<li
						className={
							location.pathname.startsWith('/projects') && style.active
						}
						onClick={() => subNav('projects')}
					>
						Projects
					</li>
				</NavLink>
				<NavLink activeClassName={style.active} to="/works">
					<li
						className={location.pathname.startsWith('/works') && style.active}
						onClick={() => subNav('works')}
					>
						Works
					</li>
				</NavLink>
			</ul>
			<AnimatePresence exitBeforeEnter>
				{subNavActive && (
					<motion.div
						key={subNavType}
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={{
							hidden: {
								x: -100,
								opacity: 0,
							},
							visible: {
								x: 0,
								opacity: 1,
								transition: {
									delay: 0.2,
								},
							},
							exit: {},
						}}
					>
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
							setSubNavChildActive={setSubNavChildActive}
						/>
					</motion.div>
				)}

				{subNavChildActive && (
					<motion.div
						key={subNavType}
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={{
							hidden: {
								x: -100,
								opacity: 0,
							},
							visible: {
								x: 0,
								opacity: 1,
								transition: {
									delay: 0.2,
								},
							},
							exit: {},
						}}
					>
						<SubNavChildNav type={subNavType} subItems={subItems} />
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Nav;
