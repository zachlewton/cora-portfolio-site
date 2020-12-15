import React, { useState, useEffect } from 'react';
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

const Level2 = () => {
	const params = useParams();
	const [loaded, setLoaded] = useState(false);
	const [content, setContent] = useState([]);

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/wp-json/custom-api/v1/sub_${params.type}?slug=${params.slug}`
			)
			.then((res) => {
				setContent(res.data);
				console.log(res.data);
			})
			.then(setLoaded(true));
	}, [params.slug]);

	return (
		<div>
			{content.map((contentItem) =>
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
};

export default Level2;
