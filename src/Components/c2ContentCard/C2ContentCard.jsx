import React, { useState, useEffect } from 'react';
import CaptionLines from '../captionLines/CaptionLines';
import MainCaption from '../mainCaption/MainCaption';
import style from './C2ContentCard.module.css';

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
		<div className={style.container}>
			<img src={src} />
			<div className={style.captionContainer}>
				<MainCaption content={main_caption} />
				<CaptionLines content={caption} />
			</div>
		</div>
	);
};

export default C2ContentCard;
