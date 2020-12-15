import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const SubNavChildNav = (props) => {
	const { subs, slug } = props.subItems;
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
