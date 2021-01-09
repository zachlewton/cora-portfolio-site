import React, { useState } from 'react';
import { location, useLocation } from 'react-router-dom';
import CaptionLines from '../captionLines/CaptionLines';
import MainCaption from '../mainCaption/MainCaption';
import style from './Gallery.module.css';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { scaleDown } from 'react-burger-menu';

const Gallery = (props) => {
	const images = props.images;
	const imageRef = props.imageRef;
	const location = useLocation();
	const [direction, setDirection] = useState(0);

	// let image = images.find((image) => {
	// 	if (image.id == imageRef) return true;
	// });
	//

	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
	console.log(images);
	let index = images.findIndex((image) => image.id === imageRef);
	const [currentIndex, setIndex] = useState(index);

	let image = images[currentIndex];

	const iconSize = '2x';

	// const length = images.length;

	//

	const variants = {
		enter: (direction) => {
			return {
				x: direction > 0 ? 1000 : -1000,
				opacity: 0,
			};
		},
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: (direction) => {
			return {
				zIndex: 0,
				x: direction < 0 ? 1000 : -1000,
				opacity: 0,
			};
		},
	};

	const handlePrev = () => {
		// index > 0 ? setIndex(currentIndex - 1) : setIndex(currentIndex);
		setDirection(-1);
		currentIndex > 0 ? setIndex(currentIndex - 1) : setIndex(currentIndex);
		image = images[currentIndex];
	};

	const handleNext = () => {
		// index < images.length ? setIndex(currentIndex + 1) : setIndex(currentIndex);
		setDirection(1);
		currentIndex < images.length - 1
			? setIndex(currentIndex + 1)
			: setIndex(currentIndex);
		image = images[currentIndex];
	};

	if (!isTabletOrMobile) {
		return (
			<div className={style.container}>
				<FontAwesomeIcon
					onClick={() => {
						handlePrev();
						setDirection(-1);
					}}
					icon={faAngleLeft}
					size={iconSize}
					style={{ marginTop: '32.02161263507897vh' }}
				/>
				<div className={style.imageContainer}>
					<AnimatePresence initial={false} custom={direction} exitBeforeEnter>
						<motion.img
							key={image.src}
							variants={variants}
							custom={direction}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								x: { type: 'spring', stiffness: 300, damping: 30 },
								opacity: { duration: 0.1 },
							}}
							src={image.src}
						/>
					</AnimatePresence>
				</div>

				<div className={style.rightContainer}>
					<FontAwesomeIcon
						onClick={() => {
							handleNext();
							setDirection(1);
						}}
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
					<FontAwesomeIcon
						style={{ height: '50px', width: '50px', color: '#6c7069' }}
						icon={faTimes}
						onClick={props.onClick}
						className={style.exit}
					/>
				) : null}
			</div>
		);
	}

	if (isTabletOrMobile) {
		return (
			<div className={style.container}>
				{location.pathname != '/home' ? (
					<div className={style.exit}>
						<FontAwesomeIcon
							style={{ height: '50px', width: '50px' }}
							icon={faTimes}
							size="lg"
							onClick={props.onClick}
						/>
					</div>
				) : null}
				<div className={style.galleryContainer}>
					<FontAwesomeIcon
						onClick={handlePrev}
						icon={faAngleLeft}
						size={iconSize}
						style={{ marginTop: '32.02161263507897vh' }}
					/>
					<div className={style.imageContainer}>
						<img src={image.src} />
					</div>

					<FontAwesomeIcon
						onClick={handleNext}
						icon={faAngleRight}
						size={iconSize}
						style={{ marginTop: '32.02161263507897vh' }}
					/>
				</div>

				<div className={style.captionContainer}>
					<MainCaption content={image.main_caption} />
					<CaptionLines content={image.caption} />
				</div>
			</div>
		);
	}
};

export default Gallery;
