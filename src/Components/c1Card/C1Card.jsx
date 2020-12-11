import React, { useState } from 'react';

const C1Card = (props) => {
	return (
		<div>
			<h2>{props.title}</h2>
			<div>{props.description}</div>
		</div>
	);
};

export default C1Card;
