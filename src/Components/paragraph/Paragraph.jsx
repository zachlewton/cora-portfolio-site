import React from 'react';
import style from './Paragraph.module.css';

const Paragraph = (props) => {
	return <div className={style.container}>{props.content}</div>;
};

export default Paragraph;
