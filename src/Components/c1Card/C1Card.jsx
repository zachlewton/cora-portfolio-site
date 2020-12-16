import React, { useState } from 'react';
import Paragraph from '../paragraph/Paragraph';

const C1Card = (props) => {
	return (
		<div>
			<h2>{props.title}</h2>
			<Paragraph content={props.description} />
		</div>
	);
};

export default C1Card;
