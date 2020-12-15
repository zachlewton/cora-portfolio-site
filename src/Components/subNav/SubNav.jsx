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
import SubNavChildNav from '../subNavChildNav/SubNavChildNav';

const SubNav = (props) => {
	const type = props.type;
	const navItems = props.navItems;
	console.log(navItems);
	const [subNavActive, setSubNavActive] = useState(false);
	const [subNavType, setSubNavType] = useState('');
	const [subItems, setSubItems] = useState({});

	const subNav = (type, subs) => {
		setSubNavActive(true);
		setSubNavType(type);
		setSubItems(subs);
	};

	const active = {
		color: 'red',
	};

	return (
		<div className={style.container}>
			<ul>
				{navItems.map((navItem) =>
					!navItem.gallery ? (
						<NavLink exact activeStyle={active} to={`/${type}/${navItem.slug}`}>
							<li onClick={() => props.subNavChild(type, navItem)}>
								{navItem.title}
							</li>
						</NavLink>
					) : (
						<NavLink
							exact
							activeStyle={active}
							to={`/${type}/${navItem.slug}/${navItem.slug}/${navItem.slug}`}
						>
							<li>{navItem.title}</li>
						</NavLink>
					)
				)}
			</ul>
		</div>
	);
};

export default SubNav;
