import React, { useState, useEffect } from 'react';
import C1Card from '../c1Card/C1Card';
import { NavLink, useLocation } from 'react-router-dom';

const L2ContentCard = (props) => {
	const { title, description, galleries, id, slug } = props.content;
	const location = useLocation();
	const url = !props.ig
		? `${location.pathname}/${slug}/${slug}`
		: `${location.pathname}/${slug}`;

	return (
		<div>
			<NavLink to={url}>
				<C1Card title={title} description={description} />
			</NavLink>
			{galleries.map((gallery) => (
				<NavLink to={`${location.pathname}/${slug}/${gallery.gallery_slug}`}>
					<img src={gallery.thumbnail} />
				</NavLink>
			))}
		</div>
	);
};

export default L2ContentCard;
