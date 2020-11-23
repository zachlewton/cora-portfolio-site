//components
import Nav from './Components/nav/Nav';
import style from './App.module.css';
import Logo from './Components/logo/Logo';
import Project from './Components/project/Project';
import Medium from './Components/medium/Medium';
import ProjectGallery from './Components/projectGallery/ProjectGallery';
import ErrorPage from './Components/errorPage/ErrorPage';

//imports
import React, { Component, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Burger from 'react-css-burger';
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
	return (
		<div className={style.container}>
			<div className={style.logoContainer}>
				<Logo />
			</div>
			<div className={style.navBar}>
				<Nav />
			</div>

			<div className={style.contentContainer}>
				<Routes>
					<Route path="/" element={<Medium />} />
					<Route path="/project/:slug" element={<Project />} />

					<Route path="gallery/:gallery" element={<ProjectGallery />} />

					<Route path="project/:slug/:subProject" element={<Project />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</div>
		</div>
	);
}
