import React, { useEffect, useState } from 'react';
import ProjectImage from '../projectImage/ProjectImage';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Gallery from '../gallery/Gallery';
import style from './GalleryContainer.module.css';

const ProjectGallery = (props) => {
	const params = useParams().gallery;

	const [galleryView, toggleGalleryView] = useState(false);

	const [imageRef, setImageRef] = useState(null);

	console.log(props);

	const raiseClick = (id) => {
		setImageRef(id);
		toggleGalleryView(true);
	};

	if (!galleryView) {
		return (
			<div className={style.container}>
				<h1></h1>
				<div className={style.imagesContainer}>
					{/* {images.map((image) => (
						<ProjectImage
							onClick={() => raiseClick(image.id)}
							image={image}
							key={image.id}
						/>
					))} */}
				</div>
			</div>
		);
	}

	if (galleryView) {
		return (
			// <Gallery
			// 	onClick={() => toggleGalleryView(false)}
			// 	images={images}
			// 	imageRef={imageRef}
			// />

			<div></div>
		);
	}
};

export default ProjectGallery;
