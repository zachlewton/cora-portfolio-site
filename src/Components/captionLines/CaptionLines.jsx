import React from 'react';
import style from './CaptionLines.module.css';
const CaptionLines = (props) => {
	return (
		<div className={style.container}>
			{props.content && props.content.map((line) => <li>{line}</li>)}
		</div>
	);
};

export default CaptionLines;
