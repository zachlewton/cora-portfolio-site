import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import topNavContext from '../../topNavContext';
import style from './SubNavChild.module.css';

const SubNavChildNav = (props) => {
	const { topNavItems, setTopNavItems } = useContext(topNavContext);

	const { subs, slug } = props.subItems;

	const location = useLocation();

	// setTopNavItems(subs);

	const active = {
		color: '#925223',
		fontFamily: 'MYRIADPRO-BOLD',
	};
	return (
		<div className={style.container}>
			<ul>
				{subs.map((sub) =>
					sub.galleries.length > 1 ? (
						<NavLink
							exact
							activeStyle={active}
							to={`/${props.type}/${slug}/${sub.slug}`}
						>
							<li>{sub.title}</li>
						</NavLink>
					) : (
						<NavLink
							exact
							activeStyle={active}
							to={`/${props.type}/${slug}/${sub.slug}/${sub.slug}`}
						>
							<li>{sub.title}</li>
						</NavLink>
					)
				)}
			</ul>
		</div>
	);
};

export default SubNavChildNav;
