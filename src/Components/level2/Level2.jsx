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
} from 'react-router-dom';
import TopNav from '../topNav/TopNav';
import MainHeader from '../mainHeader/MainHeader';
import topNavContext from '../../topNavContext';

const Level2 = () => {
	const params = useParams();
	const [loaded, setLoaded] = useState(false);
	const [content, setContent] = useState({});
	const [subs, setSubs] = useState([]);
	const { topNavItems, setTopNavItems } = useContext(topNavContext);

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/wp-json/custom-api/v1/sub_${params.type}?slug=${params.slug}`
			)
			.then((res) => {
				setContent(res.data);
				setSubs(res.data.subs);
			})
			.then(setLoaded(true));
	}, []);

	if (!loaded) {
		return <div>loading ....</div>;
	}

	if (loaded) {
		console.log(content.subs);

		return (
			<div>
				<MainHeader content={content.title} />
				{subs.map((sub) =>
					sub.galleries.length > 1 ? (
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
				{subs.map((contentItem) =>
					contentItem.galleries.length > 1 ? ( ////if navigate to ig
						<div>
							<L2ContentCard ig={true} content={contentItem} />
						</div>
					) : (
						<div>
							<L2ContentCard ig={false} content={contentItem} />
						</div> /////if navigate straight to gallery
					)
				)}
			</div>
		);
	}
};

export default Level2;
