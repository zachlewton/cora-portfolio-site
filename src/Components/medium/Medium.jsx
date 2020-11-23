import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Image from '../image/Image';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Gallery from '../gallery/Gallery';

const Medium = () => {
	// const { slug } = useParams();
	// const [loaded, setLoaded] = useState(false);
	// const [medium, setMedium] = useState({});
	// const [images, setImages] = useState([]);
	// const [gallery, setGallery] = useState(false);
	// const [imageRef, setImageRef] = useState(0);

	// //animations
	// const containerVariant = {
	// 	initial: {
	// 		opacity: 0,
	// 	},
	// 	animate: {
	// 		opacity: 1,
	// 		transition: { delay: 0.2, duration: 0.2 },
	// 	},

	// 	exit: {
	// 		opacity: 0,
	// 		transition: {
	// 			duration: 0.2,
	// 		},
	// 	},
	// };

	// useEffect(() => {
	// 	axios
	// 		.get(`/wp-json/wp/v2/work?slug=${slug}`)
	// 		.then((res) => setImages(res.data[0].acf.images));
	// }, [slug]);

	// const handleGallery = (key) => {
	// 	gallery ? setGallery(false) : setGallery(true);
	// 	setImageRef(key);
	// };

	// if (!gallery) {
	// 	return (
	// 		<AnimatePresence exitBeforeEnter>
	// 			<motion.div
	// 				key={slug}
	// 				variants={containerVariant}
	// 				initial="initial"
	// 				animate="animate"
	// 				exit="exit"
	// 			>
	// 				{images.map((image) => (
	// 					<Image
	// 						key={image.id}
	// 						image={image}
	// 						onClick={() => {
	// 							handleGallery(image.id);
	// 						}}
	// 					/>
	// 				))}
	// 			</motion.div>
	// 		</AnimatePresence>
	// 	);
	// }

	// if (gallery) {
	// 	return (
	// 		<Gallery imageRef={imageRef} onClick={handleGallery} images={images} />
	// 	);
	// }

	return <div>home</div>;
};

export default Medium;
