import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import style from './Landing.module.css';

const Landing = (props) => {
	return (
		<div className={style.container}>
			<NavLink to="/home">
				<img src={logo} />
			</NavLink>
		</div>
	);
};

export default Landing;
