import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
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

import MainHeader from '../mainHeader/MainHeader';
import Paragraph from '../paragraph/Paragraph';
import topNavContext from '../../topNavContext';
import TopNav from '../topNav/TopNav';
import Loading from '../loading/Loading';
import { motion } from 'framer-motion';
import style from './IgContainer2.module.css';
import ScrollingGallery from '../displayTypes/scrollingGallery/ScrollingGallery';
import ReactPlayer from 'react-player';
import Columns from '../displayTypes/columns/Columns';
import L1ContentCard from '../l1ContentCard/L1ContentCard';

const IgContainer = (props) => {
	const { type, slug, igSlug } = useParams();
	const [loaded, setLoaded] = useState(false);
	const [content, setContent] = useState({});
	const location = useLocation();
	const history = useHistory();

	const { topNavItems, setTopNavItems } = useContext(topNavContext);

	const active = {
		color: '#925223',
		fontFamily: 'MYRIADPRO-BOLD',
	};

	useEffect(() => {
		setLoaded(false);
		axios
			.get(
				`http://localhost:8000/wp-json/custom-api/v1/ig?type=${type}&slug=${slug}&sub_slug=${igSlug}`
			)
			.then((res) => {
				if (res.data) {
					setContent(res.data);
				} else history.push('/error');
			})
			.then(() => {
				setLoaded(true);
			});
	}, []);

	if (!loaded) {
		return <Loading />;
	}

	if (loaded) {
		setTopNavItems(content.galleries);
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				exit={{ opacity: 0 }}
				className={style.container}
			>
				<MainHeader content={content.title} />

				{content.display_type == 'intro galleries' && (
					<div className={style.topNavContainer}>
						{content.sub_galleries.map((gallery) => (
							<NavLink
								exact
								activeStyle={active}
								to={`${location.pathname}/${gallery.slug}`}
							>
								<TopNav content={gallery.title} />
							</NavLink>
						))}
					</div>
				)}

				{content.description && <Paragraph content={content.description} />}

				{content.display_type == 'intro galleries' && (
					<div className={style.images}>
						{content.sub_galleries.map((gallery) => (
							<div className={style.image}>
								<NavLink to={`${location.pathname}${gallery.slug}`}>
									<L1ContentCard content={gallery} />
								</NavLink>
							</div>
						))}
					</div>
				)}

				{content.display_type == 'scrolling gallery' && (
					<ScrollingGallery gallery={content.gallery} />
				)}

				{content.display_type == 'video' && (
					<ReactPlayer
						url={content.video_link}
						// width="100%"
						// height="100%"
						// className={style.videoPlayer}
					/>
				)}

				{content.display_type == '2 column' && (
					<Columns
						displayType={content.display_type}
						gallery={content.gallery}
					/>
				)}

				{content.display_type == '3 column' && (
					<Columns
						displayType={content.display_type}
						gallery={content.gallery}
					/>
				)}
			</motion.div>
		);
	}
};

export default IgContainer;
