import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import style from './Landing.module.css';
import axios from 'axios';

const Landing = (props) => {
	const [loaded, setLoaded] = useState(false);
	const [backgroundImage, setBackgroundImage] = useState();
	const sectionStyle = {
		width: '100vw',
		height: '100vh',
		backgroundImage: `url(${backgroundImage})`,
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		backgroundSize: '100% 100%',
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8000/wp-json/custom-api/v1/landing_page`)
			.then((res) => {
				setBackgroundImage(res.data);
			})
			.then(() => setLoaded(true));
	}, []);

	if (!loaded) {
		return <div>Loading...</div>;
	}

	if (loaded) {
		return (
			<div className={style.container}>
				<div style={sectionStyle}>
					<NavLink to="/home">
						<div className={style.container}>
							<img src={logo} />
						</div>
					</NavLink>
				</div>
			</div>
		);
	}
};

export default Landing;
