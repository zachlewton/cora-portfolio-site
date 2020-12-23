import React, { useState } from 'react';
import { location, useLocation } from 'react-router-dom';
import CaptionLines from '../captionLines/CaptionLines';
import MainCaption from '../mainCaption/MainCaption';
import style from './Gallery.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Gallery = (props) => {
	const images = props.images;
	const imageRef = props.imageRef;
	const location = useLocation();

	// let image = images.find((image) => {
	// 	if (image.id == imageRef) return true;
	// });
	//

	console.log(images);
	let index = images.findIndex((image) => image.id === imageRef);
	const [currentIndex, setIndex] = useState(index);
	let image = images[currentIndex];

	const iconSize = '2x';

	// const length = images.length;

	//

	const handlePrev = () => {
		// index > 0 ? setIndex(currentIndex - 1) : setIndex(currentIndex);
		currentIndex > 0 ? setIndex(currentIndex - 1) : setIndex(currentIndex);
		image = images[currentIndex];
	};

	const handleNext = () => {
		// index < images.length ? setIndex(currentIndex + 1) : setIndex(currentIndex);
		currentIndex < images.length - 1
			? setIndex(currentIndex + 1)
			: setIndex(currentIndex);
		image = images[currentIndex];
	};

	return (
		<div className={style.container}>
			<FontAwesomeIcon
				onClick={handlePrev}
				icon={faAngleLeft}
				size={iconSize}
				style={{ marginTop: '32.02161263507897vh' }}
			/>
			<div className={style.imageContainer}>
				<img src={image.src} />
			</div>

			<div className={style.rightContainer}>
				<FontAwesomeIcon
					onClick={handleNext}
					icon={faAngleRight}
					size={iconSize}
					style={{ marginTop: '32.02161263507897vh' }}
				/>
				<div className={style.captionContainer}>
					<MainCaption content={image.main_caption} />
					<CaptionLines content={image.caption} />
				</div>
			</div>

			{location.pathname != '/home' ? (
				<div onClick={props.onClick}>exit</div>
			) : null}
		</div>
	);
};

export default Gallery;
