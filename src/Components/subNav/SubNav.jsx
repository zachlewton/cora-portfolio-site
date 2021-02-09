import React, { useState, useContext, useEffect } from 'react';
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
import SubNavChildNav from '../subNavChildNav/SubNavChildNav';
import topNavContext from '../../topNavContext';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const SubNav = (props) => {
	const type = props.type;
	const navItems = props.navItems;

	const [subNavActive, setSubNavActive] = useState(false);
	const [subNavType, setSubNavType] = useState('');
	const [subItems, setSubItems] = useState({});
	const { topNavItems, setTopNavItems } = useContext(topNavContext);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });

	const location = useLocation();
	// setTopNavItems(navItems);

	// const subNav = (type, subs) => {
	// 	setSubNavActive(true);
	// 	setSubNavType(type);
	// 	setSubItems(subs);
	// };
	// <motion.div initial={{ x: -100 }} animate={{ x: 0 }}></motion.div>;
	const active = {
		color: '#925223',
		fontFamily: 'MYRIADPRO-BOLD',
	};

	if (type != 'info') {
		return (
			<div className={style.container}>
				<ul>
					{navItems.map((navItem) => (
						<NavLink exact to={`/${type}/${navItem.slug}`}>
							<li
								className={
									location.pathname.startsWith(`/${type}/${navItem.slug}`) &&
									style.active
								}
								onClick={() => props.subNavChild(type, navItem)}
							>
								{navItem.title}
							</li>
						</NavLink>
					))}
				</ul>
			</div>
		);
	}
	if (type === 'info') {
		return (
			<div className={style.container}>
				<ul>
					{navItems.map((navItem) => (
						<NavLink exact activeStyle={active} to={`/info/${navItem.slug}`}>
							{isTabletOrMobile ? (
								<li onClick={() => props.closeNav()}>{navItem.title}</li>
							) : (
								<li>{navItem.title}</li>
							)}
						</NavLink>
					))}
				</ul>
			</div>
		);
	}
};

export default SubNav;
