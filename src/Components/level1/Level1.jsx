import React, { useState, useEffect } from 'react';
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

const Level1 = (props) => {
	const params = useParams();
	const type = params.type;
	console.log(type);
	const [loaded, setLoaded] = useState(false);
	const [content, setContent] = useState([]);
	const location = useLocation();
	console.log(location);

	useEffect(() => {
		axios
			.get(`http://localhost:8000/wp-json/custom-api/v1/get_${type}`)
			.then((res) => {
				console.log(res.data);
				setContent(res.data);
			})
			.then(() => setLoaded(true));
	}, [type]);

	return (
		<div>
			<h1>{type}</h1>
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
};

export default Level1;
