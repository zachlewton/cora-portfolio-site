import React, { Component } from 'react';
import style from './MainHeaderWord.module.css';
const MainHeaderWord = (props) => {
	return props.word.length == 1 ? (
		<div className={style.lower}>{props.word}</div>
	) : (
		<div className={style.upper}>{props.word}</div>
	);
};

export default MainHeaderWord;
