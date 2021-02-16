import React, { useEffect, useState, useContext } from 'react';
import ProjectImage from '../projectImage/ProjectImage';
import ReactPlayer from 'react-player';
import Columns from '../displayTypes/columns/Columns';
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
import Loading from '../loading/Loading';
import { motion } from 'framer-motion';

const GalleryContainer = (props) => {
	const { type, slug, gallerySlug, igSlug } = useParams();
	// const [galleryView, toggleGalleryView] = useState(false);
	const [content, setContent] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [imageRef, setImageRef] = useState(null);
	const [topNavItems, setTopNavItems] = useState([]);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
	const history = useHistory();

	const location = useLocation();

	const imagesRequest = axios.get(
		`http://localhost:8000/wp-json/custom-api/v1/gallery_images?type=${type}&slug=${igSlug}&gallery_slug=${gallerySlug}`
	);
	const topNavRequest = axios.get(
		`http://localhost:8000/wp-json/custom-api/v1/ig?type=${type}&slug=${slug}&sub_slug=${igSlug}`
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

					if (responses[0].data) {
						setContent(imagesResponse);

						topNavResponse.sub_galleries.length == 0
							? setTopNavItems()
							: setTopNavItems(topNavResponse);
					} else history.push('/error');
				})
			)
			.then(() => setLoaded(true));
	}, [gallerySlug]);

	// const { topNavItems, setTopNavItems } = useContext(topNavContext);

	const active = {
		color: '#925223',
		fontFamily: 'MYRIADPRO-BOLD',
	};

	// const raiseClick = (id) => {
	// 	setImageRef(id);
	// 	toggleGalleryView(true);
	// };
	if (!loaded) {
		return <Loading />;
	}

	if (loaded) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				exit={{ opacity: 0 }}
				className={style.container}
			>
				<MainHeader content={content.title} />
				<div className={style.topNavContainer}>
					{topNavItems
						? topNavItems.sub_galleries.map((navItem) => (
								<NavLink
									exact
									activeStyle={active}
									to={`/${type}/${slug}/${igSlug}/${navItem.slug}`}
								>
									<TopNav slug={navItem.gallery_slug} content={navItem.title} />
								</NavLink>
						  ))
						: null}
				</div>

				{content.display_type == 'video' ? (
					<ReactPlayer url={content.video_link} />
				) : (
					<Columns
						displayType={content.display_type}
						gallery={content.images}
					/>
				)}
			</motion.div>
		);
	}
};

export default GalleryContainer;
