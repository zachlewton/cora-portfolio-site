import React, { useState, useEffect } from 'react';

const C2ContentCard = (props) => {
	const { caption, src } = props.image;

	const captionLines = (
		<div>
			{caption.map((line) => (
				<h3>{line}</h3>
			))}
		</div>
	);

	return (
		<div>
			<img src={src} />
			{captionLines}
		</div>
	);
};

export default C2ContentCard;
