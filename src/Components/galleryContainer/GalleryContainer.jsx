import React, { useEffect, useState, useContext } from 'react';
import ProjectImage from '../projectImage/ProjectImage';

import axios from 'axios';
import Gallery from '../gallery/Gallery';
import style from './GalleryContainer.module.css';
import MainHeader from '../mainHeader/MainHeader';
import topNavContext from '../../topNavContext';
import {
	BrowserRouter,
	Routes,
	Route,
	NavLink,
	Outlet,
	useParams,
	useLocation,
	usePrompt,
	useHistory,
} from 'react-router-dom';
import TopNav from '../topNav/TopNav';
import { useMediaQuery } from 'react-responsive';

const GalleryContainer = (props) => {
	const { type, slug, gallerySlug, igSlug } = useParams();
	const [galleryView, toggleGalleryView] = useState(false);
	const [content, setContent] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [imageRef, setImageRef] = useState(null);
	const [topNavItems, setTopNavItems] = useState([]);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });

	const location = useLocation();

	const imagesRequest = axios.get(
		`http://localhost:8000/wp-json/custom-api/v1/gallery_images?type=${type}&slug=${slug}&gallery_slug=${gallerySlug}`
	);
	const topNavRequest = axios.get(
		`http://localhost:8000/wp-json/custom-api/v1/ig?type=${type}&slug=${slug}&gallery_slug=${igSlug}`
	);

	useEffect(() => {
		setLoaded(false);
		setContent([]);
		axios
			.all([imagesRequest, topNavRequest])
			.then(
				axios.spread((...responses) => {
					const imagesResponse = responses[0].data;
					const topNavResponse = responses[1].data;

					setContent(imagesResponse);

					topNavResponse.galleries.length < 2
						? setTopNavItems()
						: setTopNavItems(topNavResponse);
				})
			)
			.then(() => setLoaded(true));
	}, [gallerySlug]);

	// const { topNavItems, setTopNavItems } = useContext(topNavContext);

	const active = {
		color: '#925223',
		fontFamily: 'MYRIADPRO-BOLD',
	};

	const raiseClick = (id) => {
		console.log(id);
		setImageRef(id);
		toggleGalleryView(true);
	};
	if (!loaded) {
		return <div>loading...</div>;
	}

	if (loaded) {
		if (!isTabletOrMobile) {
			if (!galleryView) {
				return (
					<div className={style.container}>
						<MainHeader content={content.title} />
						<div className={style.topNavContainer}>
							{topNavItems
								? topNavItems.galleries.map((navItem) => (
										<NavLink
											exact
											activeStyle={active}
											to={`/${type}/${slug}/${igSlug}/${navItem.gallery_slug}`}
										>
											<TopNav
												slug={navItem.gallery_slug}
												content={navItem.title}
											/>
										</NavLink>
								  ))
								: null}
						</div>

						<div className={style.images}>
							{content.images.map((image) => (
								<div className={style.image}>
									<ProjectImage
										onClick={() => raiseClick(image.id)}
										image={image}
										key={image.id}
									/>
								</div>
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

		if (isTabletOrMobile) {
			if (!galleryView) {
				return (
					<div className={style.container}>
						<MainHeader content={content.title} />
						<div className={style.topNavContainer}>
							{topNavItems
								? topNavItems.galleries.map((navItem) => (
										<NavLink
											exact
											activeStyle={active}
											to={`/${type}/${slug}/${igSlug}/${navItem.gallery_slug}`}
										>
											<TopNav
												slug={navItem.gallery_slug}
												content={navItem.title}
											/>
										</NavLink>
								  ))
								: null}
						</div>

						<div className={style.images}>
							{content.images.map((image) => (
								<div className={style.image}>
									<ProjectImage
										onClick={() => raiseClick(image.id)}
										image={image}
										key={image.id}
									/>
								</div>
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
	}
};

export default GalleryContainer;
