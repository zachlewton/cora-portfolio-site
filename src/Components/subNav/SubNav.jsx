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

	return (
		<div className={style.container}>
			<ul>
				{navItems.map((navItem) =>
					!navItem.gallery ? (
						<NavLink to={`/${type}/${navItem.slug}`}>
							<li onClick={() => subNav(type, navItem)}>{navItem.title}</li>
						</NavLink>
					) : (
						<NavLink to={`/gallery/${navItem.slug}`}>
							<li>{navItem.title}</li>
						</NavLink>
					)
				)}
			</ul>
			{subNavActive && <SubNavChildNav type={type} subItems={subItems} />}{' '}
			//////// try to put this in nav component
		</div>
	);
};

export default SubNav;
