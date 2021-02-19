import React, { Component, useState } from 'react';

import ProjectImage from '../../projectImage/ProjectImage';
import ScrollingGallery from '../scrollingGallery/ScrollingGallery';
import CaptionLines from '../../captionLines/CaptionLines';
import ReactPlayer from 'react-player';
import { useMediaQuery } from 'react-responsive';

import style from './Columns.module.css';

const Columns = (props) => {
	const column = props.display_type == '2 column' ? 2 : 3;

	console.log(props.display_type);

	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 932px)' });

	const [galleryView, toggleGalleryView] = useState(false);
	const [imageRef, setImageRef] = useState(null);

	let imageArray = [];
	console.log(props.gallery);

	// props.gallery.map((node) => {
	// 	node.type == 'image block'
	// 		? node.block.map((block) => imageArray.push(block))
	// 		: imageArray.push(node);
	// });

	props.gallery.map((node) => {
		if (node.type == 'image block') {
			node.block.map((block) => imageArray.push(block));
		} else {
			if (node.type == 'image_block') {
				node.block.map((block) => imageArray.push(block));
			} else {
				imageArray.push(node);
			}
		}
	});

	// for (var i = 0; i < props.gallery.length; i++) {
	// 	gallery[i].type == 'image block'
	// 		? node.block.map((block, i) => (

	//             imageArray.push(obj);

	//             ))
	// 		: imageArray.push(node);
	// }

	console.log(imageArray);

	const raiseClick = (obj) => {
		console.log('clicked');
		setImageRef(obj);
		toggleGalleryView(true);
	};

	return !galleryView ? (
		<div
			className={
				props.displayType == '3 column' ? style.threeGrid : style.twoGrid
			}
		>
			{imageArray.map((block) => (
				<>
					{block.type == 'video' ? (
						<div className={style.videoContainer}>
							<ReactPlayer
								className={style.reactPlayer}
								url={block.video_link}
								width="100%"
								height="100%"
							/>
							{block.caption && <CaptionLines content={block.caption} />}
						</div>
					) : (
						<div className={style.imageContainer}>
							<img
								src={block.src}
								onClick={() => raiseClick(imageArray.indexOf(block))}
								key={imageArray.indexOf(block)}
							/>
							<CaptionLines content={block.caption} />
						</div>
					)}
				</>
			))}
		</div>
	) : (
		<>
			<ScrollingGallery
				raiseExit={() => toggleGalleryView(!galleryView)}
				gallery={imageArray}
				imageRef={imageRef}
				exitButton
			/>
		</>
	);
};

export default Columns;
