import React from 'react';
import Gallery from '../../gallery/Gallery';
import { useMediaQuery } from 'react-responsive';

const ScrollingGallery = ({ gallery, imageRef, exitButton, raiseExit }) => {
	let imageArray = [];

	gallery.map((node) => {
		node.type == 'image block'
			? node.block.map((block) => imageArray.push(block))
			: imageArray.push(node);
	});

	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 932px)' });
	// return <Gallery images={imageArray} imageRef={0} />;

	return (
		<div
			style={
				!isTabletOrMobile
					? {
							height: '28vw',
							width: '100%',
							marginRight: '2vw',
					  }
					: {
							height: '80vw',
							width: '100vw',
							margin: '0',
					  }
			}
		>
			<Gallery
				images={imageArray}
				imageRef={imageRef ? imageRef : 0}
				onClick={() => raiseExit()}
				exitButton
			/>
		</div>
	);
};

export default ScrollingGallery;
