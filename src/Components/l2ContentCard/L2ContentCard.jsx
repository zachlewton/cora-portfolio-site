import React, { useState, useEffect } from 'react';
import C1Card from '../c1Card/C1Card';
import { NavLink, useLocation } from 'react-router-dom';
import style from './L2ContentCard.module.css';

const L2ContentCard = (props) => {
	const { title, description, galleries, id, slug } = props.content;
	const location = useLocation();
	const url = !props.ig
		? `${location.pathname}/${slug}/${slug}`
		: `${location.pathname}/${slug}`;

	return (
		<div className={style.container}>
			<div className={style.paragraphContainer}>
				<NavLink to={url}>
					<C1Card title={title} paragraph={description} />
				</NavLink>
			</div>

			<div className={style.images}>
				{galleries.map((gallery) => (
					<div className={style.image}>
						<NavLink
							to={`${location.pathname}/${slug}/${gallery.gallery_slug}`}
						>
							<img src={gallery.thumbnail} />
						</NavLink>
					</div>
				))}
			</div>
		</div>
	);
};

export default L2ContentCard;
