import React, { useState } from 'react';
import Link from 'react-router-dom';

const ProjectGalleryThumbnail = (props) => {
	const gallery = props.gallery;

	return (
		<>
			<h1>{gallery.title}</h1>
			<img src={gallery.thumbnail} />
		</>
	);
};

export default ProjectGalleryThumbnail;
