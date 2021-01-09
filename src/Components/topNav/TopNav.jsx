import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import topNavContext from '../../topNavContext';
import style from './TopNav.module.css';

const TopNav = (props) => {
	const { topNavItems, setTopNavItems } = useContext(topNavContext);
	const location = useLocation();

	return (
		<div className={style.topNavItemBox}>
			<div>
				<li
				// classname={
				// 	location.pathname.endsWith(`/${props.slug}`) && style.active
				// }
				>
					{props.content}
				</li>
			</div>
		</div>
	);
};

export default TopNav;
