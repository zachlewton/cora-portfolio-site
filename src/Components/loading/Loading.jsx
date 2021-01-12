import React, { Component } from 'react';

import { motion } from 'framer-motion';

const containerStyle = {
	boxSizing: 'border-box',
	display: 'flex',
	justifyContent: 'center',
	paddingTop: '40vh',

	height: '100%',
	width: '100%',
};

const circleStyle = {
	display: 'block',
	width: '10rem',
	height: '10rem',
	border: '0.5rem solid #e9e9e9',
	borderTop: '0.5rem solid #3498db',
	borderRadius: '50%',
	// position: 'absolute',
	boxSizing: 'border-box',

	// top: '40vh',
	// left: '30vw',
};

const spinTransition = {
	loop: Infinity,
	ease: 'linear',
	duration: 1,
};

const Loading = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			exit={{ opacity: 0 }}
			style={containerStyle}
		>
			<motion.span
				style={circleStyle}
				animate={{ rotate: 360 }}
				transition={spinTransition}
			/>
		</motion.div>
	);
};

export default Loading;
