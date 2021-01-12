import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import L1ContentCard from '../l1ContentCard/L1ContentCard';
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
import topNavContext from '../../topNavContext';
import MainHeader from '../mainHeader/MainHeader';
import style from './Level1.module.css';
import Level2 from '../level2/Level2';
import Loading from '../loading/Loading';
import { motion } from 'framer-motion';

const Level1 = (props) => {
	const params = useParams();
	const type = params.type;

	const [loaded, setLoaded] = useState(false);
	const [content, setContent] = useState([]);
	const location = useLocation();
	const history = useHistory();

	const { topNavItems, setTopNavItems } = useContext(topNavContext);

	useEffect(() => {
		setLoaded(false);
		axios
			.get(`https://artportfoliocora.com/wp-json/custom-api/v1/get_${type}`)
			.then((res) => {
				if (res.data) {
					setContent(res.data);
				} else history.push('/error');
			})
			.then(() => setLoaded(true));
	}, [type]);

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
				<MainHeader content={type} />

				<div className={style.topNavContainer}>
					{content.map((navItem) =>
						!navItem.gallery ? (
							<NavLink to={`/${type}/${navItem.slug}`}>
								<TopNav content={navItem.title} />
							</NavLink>
						) : (
							<NavLink
								to={`/${type}/${navItem.slug}/${navItem.slug}/${navItem.slug}`}
							>
								<TopNav content={navItem.title} />
							</NavLink>
						)
					)}
				</div>

				<div>
					{content.map((contentItem) =>
						!contentItem.gallery ? (
							<NavLink to={`/${type}/${contentItem.slug}`}>
								<L1ContentCard content={contentItem} />
							</NavLink>
						) : (
							<NavLink
								to={`/${type}/${contentItem.slug}/${contentItem.slug}/${contentItem.slug}`}
							>
								<L1ContentCard content={contentItem} />
							</NavLink>
						)
					)}
				</div>
			</motion.div>
		);
	}
};

export default Level1;
