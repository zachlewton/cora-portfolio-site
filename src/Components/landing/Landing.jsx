import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import style from './Landing.module.css';
import axios from 'axios';
import Loading from '../loading/Loading';
import { AnimatePresence, motion } from 'framer-motion';

const Landing = (props) => {
	const [loaded, setLoaded] = useState(false);
	const [backgroundImage, setBackgroundImage] = useState();
	const sectionStyle = {
		width: '100vw',
		height: '100vh',
		backgroundImage: `url(${backgroundImage})`,
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		objectFit: 'cover',
		backgroundSize: '100% 100%',
	};

	useEffect(() => {
		axios
			.get(`https://artportfoliocora.com/wp-json/custom-api/v1/landing_page`)
			.then((res) => {
				setBackgroundImage(res.data);
			})
			.then(() => setLoaded(true));
	}, []);

	if (!loaded) {
		return (
			<div className={style.loadingContainer}>
				<Loading />
			</div>
		);
	}

	if (loaded) {
		return (
			<AnimatePresence exitBeforeEnter>
				<div className={style.container}>
					<motion.div
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={{
							hidden: {
								opacity: 0,
							},
							visible: {
								x: 0,
								opacity: 1,
								transition: {
									when: 'afterChildren',
									duration: 1,
									delay: 0.2,

									staggerChildren: 2,
								},
							},
							exit: {
								opacity: 0,
								transition: {
									duration: 1,
								},
							},
						}}
						style={sectionStyle}
					>
						<NavLink to="/home">
							<div key={'image'} className={style.container}>
								<motion.img
									initial="hidden"
									animate="visible"
									exit="exit"
									variants={{
										hidden: {
											opacity: 0,
										},
										visible: {
											opacity: 1,
											transition: {
												delay: 2,
											},
										},
										exit: {},
									}}
									key={'logo'}
									src={logo}
								/>
							</div>
						</NavLink>
					</motion.div>
				</div>
			</AnimatePresence>
		);
	}
};

export default Landing;
