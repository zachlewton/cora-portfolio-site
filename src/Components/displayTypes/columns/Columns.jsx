import React, { Component, useState } from 'react';
import { HelpBlock } from 'react-bootstrap';
import ProjectImage from '../../projectImage/ProjectImage';
import ScrollingGallery from '../scrollingGallery/ScrollingGallery';

import style from './Columns.module.css';

const Columns = (props) => {
	const column = props.display_type == '2 column' ? 2 : 3;

	const [galleryView, toggleGalleryView] = useState(false);
	const [imageRef, setImageRef] = useState(null);

	let imageArray = [];

	props.gallery.map((node) => {
		node.type == 'image block'
			? node.block.map((block) => imageArray.push(block))
			: imageArray.push(node);
	});

	// for (var i = 0; i < props.gallery.length; i++) {
	// 	gallery[i].type == 'image block'
	// 		? node.block.map((block, i) => (

	//             imageArray.push(obj);

	//             ))
	// 		: imageArray.push(node);
	// }

	const raiseClick = (obj) => {
		console.log('clicked');
		setImageRef(obj);
		toggleGalleryView(true);
	};

	return !galleryView ? (
		<div
			className={
				props.display_type == 'three column' ? style.threeGrid : style.twoGrid
			}
		>
			{imageArray.map((block) => (
				<>
					{block.type == 'video' ? (
						<div className={style.videoContainer}>video</div>
					) : (
						<div className={style.imageContainer}>
							<ProjectImage
								onClick={() => raiseClick(imageArray.indexOf(block))}
								image={block}
								key={imageArray.indexOf(block)}
							/>
						</div>
					)}
				</>
			))}
		</div>
	) : (
		<ScrollingGallery
			raiseExit={() => toggleGalleryView(!galleryView)}
			gallery={imageArray}
			imageRef={imageRef}
			exitButton
		/>
	);
};

export default Columns;
