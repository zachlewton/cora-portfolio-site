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

import style from './IgContainer.module.css';

const IgContainer = (props) => {
	const { type, slug, igSlug } = useParams();
	const [loaded, setLoaded] = useState(false);
	const [content, setContent] = useState({});
	const location = useLocation();

	const { topNavItems, setTopNavItems } = useContext(topNavContext);

	const active = {
		color: '#925223',
		fontFamily: 'MYRIADPRO-BOLD',
	};

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/wp-json/custom-api/v1/ig?type=${type}&slug=${slug}&gallery_slug=${igSlug}`
			)
			.then((res) => {
				console.log(res.data);
				setContent(res.data);
			})
			.then(() => {
				setLoaded(true);
			});
	}, []);

	if (!loaded) {
		return <div>loading...</div>;
	}

	if (loaded) {
		setTopNavItems(content.galleries);
		return (
			<div className={style.container}>
				<MainHeader content={content.title} />
				<div className={style.topNavContainer}>
					{content.galleries.map((gallery) => (
						<NavLink
							exact
							activeStyle={active}
							to={`${location.pathname}/${gallery.gallery_slug}`}
						>
							<TopNav content={gallery.title} />
						</NavLink>
					))}
				</div>

				<Paragraph content={content.description} />
				<div className={style.images}>
					{content.galleries.map((gallery) => (
						<div className={style.image}>
							<NavLink to={`${location.pathname}/${gallery.gallery_slug}`}>
								<h2 className={style.title}>{gallery.title}</h2>
								<img src={gallery.thumbnail} />
							</NavLink>
						</div>
					))}
				</div>
			</div>
		);
	}
};

export default IgContainer;
