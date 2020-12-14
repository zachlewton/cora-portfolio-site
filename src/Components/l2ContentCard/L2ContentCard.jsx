import React, { useState, useEffect } from 'react';
import C1Card from '../c1Card/C1Card';

const L2ContentCard = (props) => {
	const { title, description, galleries, id, slug } = props.content;
	return (
		<div>
			<C1Card title={title} description={description} />
			{galleries.map((gallery) => (
				<img src={gallery.thumbnail} /> ////navigate to that gallery onClick
			))}
		</div>
	);
};

export default L2ContentCard;
