import React from 'react';

const CaptionLines = (props) => {
	return (
		<div>
			{props.content.map((line) => (
				<h3>{line}</h3>
			))}
		</div>
	);
};

export default CaptionLines;
