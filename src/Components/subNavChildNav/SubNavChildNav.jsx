import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const SubNavChildNav = (props) => {
	const { subs, type, slug } = props.subItems;
	return (
		<div>
			{subs.map((sub) =>
				sub.galleries.length > 1 ? (
					<NavLink to={`/${type}/${slug}/${sub.slug}`}>hi</NavLink>
				) : (
					<NavLink to={`/gallery/${sub.slug}`}>hi</NavLink>
				)
			)}
		</div>
	);
};

export default SubNavChildNav;
