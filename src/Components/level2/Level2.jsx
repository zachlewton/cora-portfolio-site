import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import L2ContentCard from '../l2ContentCard/L2ContentCard';
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
	Redirect,
} from 'react-router-dom';
import TopNav from '../topNav/TopNav';
import MainHeader from '../mainHeader/MainHeader';
import topNavContext from '../../topNavContext';
import style from './Level2.module.css';
import Loading from '../loading/Loading';
import Paragraph from '../paragraph/Paragraph';
import Subs from '../displayTypes/subs/Subs';
import ScrollingGallery from '../displayTypes/scrollingGallery/ScrollingGallery';
import ReactPlayer from 'react-player';
import Columns from '../displayTypes/columns/Columns';

import { motion } from 'framer-motion';

const Level2 = () => {
	const params = useParams();
	const history = useHistory();
	const [loaded, setLoaded] = useState(false);
	const [content, setContent] = useState({});
	const [subs, setSubs] = useState([]);

	useEffect(() => {
		setLoaded(false);
		axios
			.get(
				`http://localhost:8000/wp-json/custom-api/v1/sub_${params.type}?slug=${params.slug}`
			)
			.then((res) => {
				if (res.data) {
					setContent(res.data);
					setSubs(res.data.subs);
				} else history.push('/error');
			})
			.then(() => {
				setLoaded(true);
			})
			.catch((error) => <Redirect to="dfhkdsjfsjdkfskj" />);
	}, [params.slug]);

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

				{content.display_type == `sub ${params.type}` && (
					<div className={style.topNavContainer}>
						{subs.map((sub) => (
							<NavLink to={`/${params.type}/${params.slug}/${sub.slug}`}>
								<TopNav content={sub.title} />
							</NavLink>
						))}
					</div>
				)}

				{content.description && <Paragraph content={content.description} />}

				{content.display_type == `sub ${params.type}` && (
					<Subs className={style.subs} subs={subs} />
				)}

				{content.display_type == 'scrolling gallery' && (
					<ScrollingGallery gallery={content.gallery} />
				)}

				{content.display_type == 'video' && (
					<ReactPlayer
						url={content.video.video_link}
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

export default Level2;
