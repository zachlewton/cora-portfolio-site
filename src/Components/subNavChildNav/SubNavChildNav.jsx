import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import topNavContext from '../../topNavContext';

const SubNavChildNav = (props) => {
	const { topNavItems, setTopNavItems } = useContext(topNavContext);

	const { subs, slug } = props.subItems;

	// setTopNavItems(subs);

	const active = {
		color: 'red',
	};
	return (
		<div>
			{subs.map((sub) =>
				sub.galleries.length > 1 ? (
					<NavLink
						exact
						activeStyle={active}
						to={`/${props.type}/${slug}/${sub.slug}`}
					>
						{sub.title}
					</NavLink>
				) : (
					<NavLink
						exact
						activeStyle={active}
						to={`/${props.type}/${slug}/${sub.slug}/${sub.slug}`}
					>
						{sub.title}
					</NavLink>
				)
			)}
		</div>
	);
};

export default SubNavChildNav;
