import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Level1 from '../level1/Level1';
import C1Card from '../c1Card/C1Card';
import C2ContentCard from '../c2ContentCard/C2ContentCard';
import style from './L1ContentCard.module.css';

const Level1ContentCard = (props) => {
	const content = props.content;

	return (
		<div className={style.container}>
			<C1Card title={content.title} paragraph={content.description} />
			<C2ContentCard image={content.featured_image} />
		</div>
	);
};

export default Level1ContentCard;
