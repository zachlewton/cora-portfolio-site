import React, { Component } from 'react';
import style from './Image.module.css';

const Image = (props) => {
	const image = props.image;

	return (
		<div className={style.imagesContainer} onClick={props.onClick}>
			<img src={image.sizes.medium} />
			<div dangerouslySetInnerHTML={{ __html: image.title }} />
			<div dangerouslySetInnerHTML={{ __html: image.caption }} />
			<div dangerouslySetInnerHTML={{ __html: image.description }} />
		</div>
	);
};

export default Image;
