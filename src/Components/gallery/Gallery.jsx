import React, { useState } from 'react';
import CaptionLines from '../captionLines/CaptionLines';
import MainCaption from '../mainCaption/MainCaption';

const Gallery = (props) => {
	const images = props.images;
	const imageRef = props.imageRef;

	// let image = images.find((image) => {
	// 	if (image.id == imageRef) return true;
	// });
	//

	console.log(images);
	let index = images.findIndex((image) => image.id === imageRef);
	const [currentIndex, setIndex] = useState(index);
	let image = images[currentIndex];

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
		<>
			<img src={image.src} />
			<MainCaption content={image.main_caption} />
			<CaptionLines content={image.caption} />
			<button onClick={handlePrev}>prev</button>
			<button onClick={handleNext}>next</button>
			<div onClick={props.onClick}>exit</div>
		</>
	);
};

export default Gallery;
