import React, { useState, useEffect } from 'react';
import CaptionLines from '../captionLines/CaptionLines';
import MainCaption from '../mainCaption/MainCaption';

const C2ContentCard = (props) => {
	const { main_caption, caption, src } = props.image;

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
			<MainCaption content={main_caption} />
			<CaptionLines content={caption} />
		</div>
	);
};

export default C2ContentCard;
