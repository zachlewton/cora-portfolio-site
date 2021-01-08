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

import InfoContainer from './Components/infoContainer/InfoContainer';

//imports
import React, { Component, useEffect, useState, createContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Burger from 'react-css-burger';
import { useMediaQuery } from 'react-responsive';
import { Switch, Route, useLocation, useParams } from 'react-router-dom';

import topNavContext from './topNavContext';
import TopNav from './Components/topNav/TopNav';
import logo from './images/logo.png';
export default function App() {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
	const [topNavItems, setTopNavItems] = useState({});
	const [active, setActive] = useState(false);
	const value = { topNavItems, setTopNavItems };
	const { pathname } = useLocation();

	return (
		<>
			<topNavContext.Provider value={value}>
				<div className={style.noScroll}>
					{isTabletOrMobile && (
						<div
							className={style.mobileNavContainer}
							style={{ display: !active && 'none' }}
						>
							<MobileNav hideNav={() => setActive(false)} />
						</div>
					)}
					<div
						className={
							!isTabletOrMobile ? style.container : style.mobileContainer
						}
					>
						{!isTabletOrMobile && (
							<>
								<div className={style.header}>
									<a href={'/home'}>
										<img src={logo} />
									</a>
								</div>

								<div className={style.navBar}>
									<Nav />
									<div className={style.navBorder}></div>
								</div>
							</>
						)}
						{isTabletOrMobile && (
							<div className={style.burger}>
								<Burger onClick={() => setActive(!active)} active={active} />
							</div>
						)}

						<div className={style.contentContainer}>
							<div className={style.flipped}>
								<Switch>
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
					</div>
				</div>
			</topNavContext.Provider>
		</>
	);
}
