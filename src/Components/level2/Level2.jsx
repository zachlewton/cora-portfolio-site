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

import { motion } from 'framer-motion';

const Level2 = () => {
	const params = useParams();
	const history = useHistory();
	const [loaded, setLoaded] = useState(false);
	const [content, setContent] = useState({});
	const [subs, setSubs] = useState([]);

	useEffect(() => {
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
	}, []);

	if (!loaded) {
		return <Loading />;
	}

	if (loaded) {
		if (content.display_type == `sub ${params.type}`) {
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
						{subs.map((sub) =>
							sub.display_type == 'intro galleries' ? (
								<NavLink to={`/${params.type}/${params.slug}/${sub.slug}`}>
									<TopNav content={sub.title} />
								</NavLink>
							) : (
								<NavLink
									to={`/${params.type}/${params.slug}/${sub.slug}/${sub.slug}`}
								>
									<TopNav content={sub.title} />
								</NavLink>
							)
						)}
					</div>

					<Paragraph content={content.description} />

					<div className={style.images}>
						{subs.map((contentItem) =>
							contentItem.display_type == 'intro galleries' ? ( ////if navigate to ig
								<div className={style.L2CardContainer}>
									<L2ContentCard ig={true} content={contentItem} />
								</div>
							) : (
								<div className={style.L2CardContainer}>
									<L2ContentCard ig={false} content={contentItem} />
								</div> /////if navigate straight to gallery
							)
						)}
					</div>
				</motion.div>
			);
		}
	}
};

export default Level2;
