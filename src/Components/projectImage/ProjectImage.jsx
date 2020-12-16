import React, { useState } from 'react';
import style from './ProjectImage.module.css';
import CaptionLines from '../captionLines/CaptionLines';

const ProjectImage = (props) => {
	const image = props.image;

	return (
		<div className={style.container}>
			<img onClick={props.onClick} src={image.src} />
			<h1>{image.title}</h1>
			<CaptionLines content={image.caption} />
		</div>
	);
};

export default ProjectImage;
