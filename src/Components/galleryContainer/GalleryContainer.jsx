import React, { useEffect, useState } from 'react';
import ProjectImage from '../projectImage/ProjectImage';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Gallery from '../gallery/Gallery';
import style from './GalleryContainer.module.css';
import MainHeader from '../mainHeader/MainHeader';

const GalleryContainer = (props) => {
	const { type, slug, gallerySlug } = useParams();
	const [galleryView, toggleGalleryView] = useState(false);
	const [content, setContent] = useState([]);
	const [loaded, setLoaded] = useState(false);

	const [imageRef, setImageRef] = useState(null);

	useEffect(() => {
		setLoaded(false);
		setContent([]);
		axios
			.get(
				`http://localhost:8000/wp-json/custom-api/v1/gallery_images?type=${type}&slug=${slug}&gallery_slug=${gallerySlug}`
			)
			.then((res) => {
				console.log(res.data);
				setContent(res.data);
			})
			.then(() => setLoaded(true));
	}, [gallerySlug]);

	console.log(props);

	const raiseClick = (id) => {
		setImageRef(id);
		toggleGalleryView(true);
	};
	if (!loaded) {
		return <div>loading...</div>;
	}

	if (loaded) {
		if (!galleryView) {
			return (
				<div className={style.container}>
					<MainHeader content={content.title} />
					<div className={style.imagesContainer}>
						{content.images.map((image) => (
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
					images={content.images}
					imageRef={imageRef}
				/>
			);
		}
	}
};

export default GalleryContainer;
