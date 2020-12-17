//components
import Nav from './Components/nav/Nav';
import style from './App.module.css';
import Logo from './Components/logo/Logo';
import Project from './Components/project/Project';
import Medium from './Components/medium/Medium';
import GalleryContainer from './Components/galleryContainer/GalleryContainer';
import ErrorPage from './Components/errorPage/ErrorPage';
import MobileNav from './Components/mobileNav/MobileNav';
import Level1 from './Components/level1/Level1';
import Level2 from './Components/level2/Level2';
import IgContainer from './Components/igContainer/IgContainer';

//imports
import React, { Component, useEffect, useState, createContext } from 'react';
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
import topNavContext from './topNavContext';
import TopNav from './Components/topNav/TopNav';

export default function App() {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
	const [topNavItems, setTopNavItems] = useState({});
	const [active, setActive] = useState(false);
	const value = { topNavItems, setTopNavItems };
	const { pathname } = useLocation();

	return (
		<>
			<topNavContext.Provider value={value}>
				<div
					className={
						!isTabletOrMobile ? style.container : style.mobileContainer
					}
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
							<Route path="/:type" element={<Level1 />} />
							<Route path="/:type/:slug" element={<Level2 />} />
							<Route path="/:type/:slug/:igSlug" element={<IgContainer />} />
							<Route
								path="/:type/:slug/:igSlug/:gallerySlug"
								element={<GalleryContainer />}
							/>

							<Route path="*" element={<ErrorPage />} />
						</Routes>
					</div>
				</div>
			</topNavContext.Provider>
		</>
	);
}
