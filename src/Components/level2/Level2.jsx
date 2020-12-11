import React, { useState, useEffect } from 'react';
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
			{Object.keys(content).map((contentItem) => console.log(contentItem))}
		</div>
	);
};

export default Level2;
