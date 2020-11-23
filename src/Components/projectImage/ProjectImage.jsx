import React, { useState } from 'react';

const ProjectImage = (props) => {
	const image = props.image;

	return (
		<>
			<div>
				<img onClick={props.onClick} src={image.src} />
				<h2>{image.title}</h2>
			</div>
		</>
	);
};

export default ProjectImage;
