import React from 'react';
import style from './MainHeader.module.css';
import MainHeaderWord from '../mainHeaderWord/MainHeaderWord';

const MainHeader = (props) => {
	const words = props.content.split(' ');

	const parsedWords = words.map((word) => {
		if (word.length <= 2) {
			return word;
		} else {
			return `<span class=${style.capital}>${word[0]}</span>${word.substring(
				1
			)}`;
		}
	});
	const newHeader = parsedWords.join(' ');

	return (
		<div
			className={style.header}
			dangerouslySetInnerHTML={{ __html: newHeader }}
		/>
	);
};

export default MainHeader;
