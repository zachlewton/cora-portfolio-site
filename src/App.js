//components
import Nav from './Components/nav/Nav';
import style from './App.module.css';
import Logo from './Components/logo/Logo';
import Project from './Components/project/Project';
import Medium from './Components/medium/Medium';
import ProjectGallery from './Components/projectGallery/ProjectGallery';
import ErrorPage from './Components/errorPage/ErrorPage';
import MobileNav from './Components/mobileNav/MobileNav';

//imports
import React, { Component, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Burger from 'react-css-burger';
import { useMediaQuery } from 'react-responsive';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Outlet,
	useParams,
	useLocation,
} from 'react-router-dom';
import ReactDOM from 'react-dom';

export default function App() {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

	const [active, setActive] = useState(false);

	console.log(isTabletOrMobile);

	return (
		<>
			<div
				className={!isTabletOrMobile ? style.container : style.mobileContainer}
			>
				{!isTabletOrMobile && (
					<>
						<header>header</header>
						<div className={style.navBar}>
							<Nav />
						</div>
					</>
				)}
				{isTabletOrMobile && (
					<div className={style.burger}>
						<Burger onClick={() => setActive(!active)} active={active} />
					</div>
				)}

				<div className={style.contentContainer}>
					{isTabletOrMobile && (
						<div style={{ display: !active && 'none' }}>
							<MobileNav />
						</div>
					)}

					<Routes>
						<Route path="/" element={<Medium />} />
						<Route path="/project/:slug" element={<Project />} />

						<Route path="gallery/:gallery" element={<ProjectGallery />} />

						<Route path="project/:slug/:subProject" element={<Project />} />
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</div>
			</div>
		</>
	);
}
