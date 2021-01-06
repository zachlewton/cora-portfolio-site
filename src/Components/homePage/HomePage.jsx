import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gallery from '../gallery/Gallery';

const HomePage = () => {
	const [images, setImages] = useState();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		axios
			.get('http://localhost:8000/wp-json/custom-api/v1/home_page')
			.then((res) => {
				setImages(res.data);
			})
			.then(() => setLoaded(true));
	}, []);

	if (loaded) {
		return (
			<div>
				<Gallery imageRef={images[0].id} images={images} />
			</div>
		);
	} else return <div>Loading... </div>;
};

export default HomePage;
