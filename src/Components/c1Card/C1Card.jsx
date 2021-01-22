import React, { useState } from 'react';
import Paragraph from '../paragraph/Paragraph';
import style from './C1Card.module.css';

const C1Card = (props) => {
	return (
		<div className={style.container}>
			<h2 className={style.c2Header}>{props.title}</h2>
			{props.paragraph && <Paragraph content={props.paragraph} />}
		</div>
	);
};

export default C1Card;
