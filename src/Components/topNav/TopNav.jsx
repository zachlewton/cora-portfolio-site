import React, { useState, useContext } from 'react';
import topNavContext from '../../topNavContext';

const TopNav = (props) => {
	const { topNavItems, setTopNavItems } = useContext(topNavContext);

	return <li>{props.content}</li>;
};

export default TopNav;
