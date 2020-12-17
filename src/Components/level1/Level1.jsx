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

const Level1 = (props) => {
	const params = useParams();
	const type = params.type;
	console.log(type);
	const [loaded, setLoaded] = useState(false);
	const [content, setContent] = useState([]);
	const location = useLocation();

	const { topNavItems, setTopNavItems } = useContext(topNavContext);

	useEffect(() => {
		axios
			.get(`http://localhost:8000/wp-json/custom-api/v1/get_${type}`)
			.then((res) => {
				console.log(res.data);
				setContent(res.data);
			})
			.then(() => setLoaded(true));
	}, [type]);

	if (!loaded) {
		return <div>loading....</div>;
	}

	if (loaded) {
		return (
			<div>
				<h1>{type}</h1>

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

				<div>
					{content.map((contentItem) =>
						!contentItem.gallery ? (
							<NavLink to={`/${type}/${contentItem.slug}`}>
								<L1ContentCard content={contentItem} />
							</NavLink>
						) : (
							<NavLink to={`/gallery/${contentItem.slug}`}>
								<L1ContentCard content={contentItem} />
							</NavLink>
						)
					)}
				</div>
			</div>
		);
	}
};

export default Level1;
