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
import { useMediaQuery } from 'react-responsive';

const SubNav = (props) => {
	const type = props.type;
	const navItems = props.navItems;
	console.log(navItems);
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

	const active = {
		color: '#925223',
		fontFamily: 'MYRIADPRO-BOLD',
	};

	if (type != 'info') {
		return (
			<div className={style.container}>
				<ul>
					{navItems.map((navItem) =>
						!navItem.gallery ? (
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
						) : (
							<NavLink
								exact
								to={`/${type}/${navItem.slug}/${navItem.slug}/${navItem.slug}`}
							>
								<li
									className={
										location.pathname.startsWith(`/${type}/${navItem.slug}`) &&
										style.active
									}
									onClick={() => props.setSubNavChildActive(false)}
								>
									{navItem.title}
								</li>
							</NavLink>
						)
					)}
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
