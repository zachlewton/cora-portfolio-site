import React, { useState } from 'react';
import Link from 'react-router-dom';
import style from './ProjectGalleryThumbnail.module.css';

const ProjectGalleryThumbnail = (props) => {
	const gallery = props.gallery;

	return (
		<div className={style.container}>
			<h1>{gallery.title}</h1>
			<img src={gallery.thumbnail} />
		</div>
	);
};

export default ProjectGalleryThumbnail;
