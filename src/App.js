//components
import Nav from './Components/nav/Nav';
import style from './App.module.css';
import Logo from './Components/logo/Logo';
import Project from './Components/project/Project';
import HomePage from './Components/homePage/HomePage';
import GalleryContainer from './Components/galleryContainer/GalleryContainer';
import ErrorPage from './Components/errorPage/ErrorPage';
import MobileNav from './Components/mobileNav/MobileNav';
import Level1 from './Components/level1/Level1';
import Level2 from './Components/level2/Level2';
import IgContainer from './Components/igContainer/IgContainer';
import Landing from './Components/landing/Landing';
import InfoContainer from './Components/infoContainer/InfoContainer';

//imports
import React, { Component, useEffect, useState, createContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Burger from 'react-css-burger';
import { useMediaQuery } from 'react-responsive';
import { Switch, Route, useLocation } from 'react-router-dom';

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

						<Switch>
							<Route exact path="/">
								<Landing />
							</Route>
							<Route exact path="/home">
								<HomePage />
							</Route>
							<Route exact path="/info/:slug">
								<InfoContainer />
							</Route>
							<Route exact path="/:type">
								<Level1 />
							</Route>
							<Route exact path="/:type/:slug">
								<Level2 />
							</Route>
							<Route exact path="/:type/:slug/:igSlug">
								<IgContainer />
							</Route>
							<Route exact path="/:type/:slug/:igSlug/:gallerySlug">
								<GalleryContainer />
							</Route>

							<Route path="*">
								<ErrorPage />
							</Route>
						</Switch>
					</div>
				</div>
			</topNavContext.Provider>
		</>
	);
}
