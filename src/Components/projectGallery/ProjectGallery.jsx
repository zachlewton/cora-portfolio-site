import React, { useEffect, useState } from 'react';
import ProjectImage from '../projectImage/ProjectImage';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Gallery from '../gallery/Gallery';
import style from './ProjectGallery.module.css';

const ProjectGallery = (props) => {
	const params = useParams().gallery;

	const [images, setimages] = useState([]);
	const [galleryTitle, setGalleryTitle] = useState('');
	const [galleryView, toggleGalleryView] = useState(false);

	const [imageRef, setImageRef] = useState(null);

	console.log(props);

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/wp-json/custom-api/v1/gallery_images?slug=${params}`
			)
			.then((res) => {
				setimages(res.data[0].images);
				setGalleryTitle(res.data[0].title);
				console.log(res.data);
			});
	}, [params]);

	const raiseClick = (id) => {
		setImageRef(id);
		toggleGalleryView(true);
	};

	if (!galleryView) {
		return (
			<div className={style.container}>
				<h1>{galleryTitle}</h1>
				<div className={style.imagesContainer}>
					{images.map((image) => (
						<ProjectImage
							onClick={() => raiseClick(image.id)}
							image={image}
							key={image.id}
						/>
					))}
				</div>
			</div>
		);
	}

	if (galleryView) {
		return (
			<Gallery
				onClick={() => toggleGalleryView(false)}
				images={images}
				imageRef={imageRef}
			/>
		);
	}
};

export default ProjectGallery;
