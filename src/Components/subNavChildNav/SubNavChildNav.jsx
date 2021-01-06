import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import topNavContext from '../../topNavContext';
import style from './SubNavChild.module.css';

const SubNavChildNav = (props) => {
	const { topNavItems, setTopNavItems } = useContext(topNavContext);

	const { subs, slug } = props.subItems;

	const location = useLocation();

	const [activeSubNavChild, setActiveSubNavChild] = useState('');

	// setTopNavItems(subs);

	const active = {
		color: '#925223',
		fontFamily: 'MYRIADPRO-BOLD',
	};

	function testLink(slug) {
		const exp = new RegExp(`\/${slug}.*`);
		const path = location.pathname;

		return exp.test(path);
	}

	return (
		<div className={style.container}>
			<ul>
				{subs.map((sub) =>
					sub.galleries.length > 1 ? (
						<NavLink to={`/${props.type}/${slug}/${sub.slug}`}>
							<li
								className={testLink(sub.slug) && style.active}
								// className={activeSubNavChild == sub.slug && style.active}
								onClick={() => setActiveSubNavChild(sub.slug)}
							>
								{sub.title}
							</li>
						</NavLink>
					) : (
						<NavLink to={`/${props.type}/${slug}/${sub.slug}/${sub.slug}`}>
							<li
								className={location.pathname.endsWith(sub.slug) && style.active}
								onClick={() => setActiveSubNavChild(sub.slug)}
							>
								{sub.title}
							</li>
						</NavLink>
					)
				)}
			</ul>
		</div>
	);
};

export default SubNavChildNav;
