import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gallery from '../gallery/Gallery';
import { motion } from 'framer-motion';
import Loading from '../loading/Loading';

const HomePage = () => {
	const [images, setImages] = useState();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		axios
			.get('https://artportfoliocora.com/wp-json/custom-api/v1/home_page')
			.then((res) => {
				setImages(res.data);
			})
			.then(() => setLoaded(true));
	}, []);

	if (loaded) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				exit={{ opacity: 0 }}
			>
				<Gallery imageRef={images[0].id} images={images} />
			</motion.div>
		);
	} else return <Loading />;
};

export default HomePage;
