import React, { useState, useEffect } from 'react';

const InfoContentBlock = (props) => {
	const block = props.content;
	return (
		<div>
			<h2>{block.title}</h2>
		</div>
	);
};

export default InfoContentBlock;
