import React, { useState, useContext } from 'react';
import topNavContext from '../../topNavContext';
import style from './TopNav.module.css';

const TopNav = (props) => {
	const { topNavItems, setTopNavItems } = useContext(topNavContext);

	return (
		<div className={style.topNavItemBox}>
			<li classname={style.topNavItem}>{props.content}</li>
		</div>
	);
};

export default TopNav;
