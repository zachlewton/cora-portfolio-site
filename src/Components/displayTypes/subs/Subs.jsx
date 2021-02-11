import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import L1ContentCard from '../../l1ContentCard/L1ContentCard';
import style from './Subs.module.css';

const Subs = ({ subs }) => {
	const location = useLocation();

	return (
		<div className={style.images}>
			{subs.map((contentItem) => (
				////if navigate to ig
				<NavLink to={`${location.pathname}/${contentItem.slug}`}>
					<div className={style.L2CardContainer}>
						<L1ContentCard ig={true} content={contentItem} />
					</div>
				</NavLink>
			))}
		</div>
	);
};

export default Subs;
