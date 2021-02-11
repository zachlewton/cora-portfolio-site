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
import ReactPlayer from 'react-player';

const Gallery = (props) => {
	const images = props.images;
	const imageRef = props.imageRef;
	const location = useLocation();
	const [direction, setDirection] = useState(0);

	// let image = images.find((image) => {
	// 	if (image.id == imageRef) return true;
	// });
	//

	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 932px)' });

	// let index = images.findIndex((image) => image.id === imageRef);

	let index = imageRef;
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
			// zIndex: 1,
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
		console.log(currentIndex);
	};

	const handleNext = () => {
		// index < images.length ? setIndex(currentIndex + 1) : setIndex(currentIndex);
		setDirection(1);
		currentIndex < images.length - 1
			? setIndex(currentIndex + 1)
			: setIndex(currentIndex);
		image = images[currentIndex];

		console.log(currentIndex);
	};

	return (
		<>
			<div className={style.container}>
				<div className={style.leftButton}>
					<FontAwesomeIcon
						onClick={() => {
							handlePrev();
							setDirection(-1);
						}}
						icon={faAngleLeft}
						size={iconSize}
						style={{ top: '50%', position: 'relative' }}
					/>
				</div>

				{/* <div className={style.imageContainer}> */}
				<AnimatePresence initial={false} custom={direction} exitBeforeEnter>
					{image.type ? (
						<motion.div
							key={image.video_link}
							variants={variants}
							custom={direction}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								x: {
									type: 'spring',
									stiffness: 300,
									damping: 30,
								},
								opacity: { duration: 0.5 },
							}}
						>
							<div className={style.videoPlayer}>
								<ReactPlayer
									className={style.reactPlayer}
									controls={true}
									url={image.video_link}
								/>
							</div>
						</motion.div>
					) : (
						<motion.img
							key={image.src}
							variants={variants}
							custom={direction}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								x: {
									type: 'spring',
									stiffness: 300,
									damping: 30,
								},
								opacity: { duration: 0.5 },
							}}
							src={image.src}
						/>
					)}
				</AnimatePresence>

				<div className={style.rightButton}>
					<FontAwesomeIcon
						onClick={() => {
							handleNext();
							setDirection(1);
						}}
						icon={faAngleRight}
						size={iconSize}
						style={{ top: '50%', position: 'relative' }}
					/>
				</div>

				{props.exitButton && (
					<FontAwesomeIcon
						style={{ height: '50px', width: '50px', color: '#6c7069' }}
						icon={faTimes}
						onClick={props.onClick}
						className={style.exit}
					/>
				)}

				{!isTabletOrMobile && (
					<div className={style.captionContainer}>
						<MainCaption content={image.main_caption} />
						<CaptionLines content={image.caption} />
					</div>
				)}
			</div>

			{isTabletOrMobile && (
				<div className={style.captionContainer}>
					<MainCaption content={image.main_caption} />
					<CaptionLines content={image.caption} />
				</div>
			)}
		</>
	);
};

export default Gallery;
