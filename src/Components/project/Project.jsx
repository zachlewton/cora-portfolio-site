import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Image from '../image/Image';

import style from './Project.module.css';
import { CSSTransitionGroup } from 'react-transition-group';
import { motion } from 'framer-motion';
import {
	BrowserRouter,
	Routes,
	Route,
	NavLink,
	Outlet,
	useParams,
	useLocation,
	usePrompt,
	useHistory,
} from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import ProjectGalleryThumbnail from '../projectGalleryThumbnail/ProjectGalleryThumbnail';
import ProjectGallery from '../projectGallery/ProjectGallery';
import ErrorPage from '../errorPage/ErrorPage';

const Project = (props) => {
	const [projectDescription, setProjectDescription] = useState('');
	const [projectTitle, setProjectTitle] = useState('');
	const [error, setError] = useState(false);

	const [loaded, setLoaded] = useState(false);
	const [projectGalleries, setProjectGalleries] = useState([]);

	const params = useParams();

	const endpoint = !params.subProject ? 'projects' : 'sub_project_by_name';
	const projectSlug = !params.subProject ? params.slug : params.subProject;
	const gallerySlug = !params.subProject ? params.slug : params.subProject;
	const galleryEndpoint = !params.subProject ? '' : 'sub_';

	const projectsRequest = axios.get(
		`http://localhost:8000/wp-json/custom-api/v1/${endpoint}?slug=${projectSlug}`
	);
	const projectGalleriesRequest = axios.get(
		`http://localhost:8000/wp-json/custom-api/v1/${galleryEndpoint}project_galleries?slug=${gallerySlug}`
	);

	useEffect(() => {
		axios
			.all([projectsRequest, projectGalleriesRequest])
			.then(
				axios.spread((...responses) => {
					const projectsResponse = responses[0].data[0];
					const projectGalleriesResponse = responses[1].data;
					console.log(projectsResponse);

					setProjectTitle(projectsResponse.title);
					setProjectDescription(projectsResponse.description);

					var arr2 = Object.keys(projectGalleriesResponse).map(function (i) {
						return projectGalleriesResponse[i];
					});

					// setProjectGalleries(projectGalleriesResponse);

					setProjectGalleries(arr2);
				})
			)
			.catch((error) => {
				setError(true);
			})

			.then(() => setLoaded(true));
	}, [params]);

	if (!loaded) {
		return <div>loading</div>;
	}

	if (error) {
		return <ErrorPage />;
	}
	if (loaded) {
		// return <ProjectGalleryContainer galleries={galleries} />;
		console.log(projectGalleries);

		return (
			<div>
				<h1>{projectTitle}</h1>
				<h2>{projectDescription}</h2>
				{projectGalleries.map((gallery) => (
					<NavLink to={`/gallery/${gallery.gallery_slug}`}>
						<ProjectGalleryThumbnail
							gallery={gallery}
							isSubProject={!params.subProject ? false : true}
						/>
					</NavLink>
				))}
			</div>
		);
	}

	// <div className={style.projectContainer}>
	// 	<div>{projectTitle}</div>
	// 	<div dangerouslySetInnerHTML={{ __html: projectDescription }} />
	// 	{images.map((image) => (
	// 		<Image key={image.id} image={image} />
	// 	))}
	// </div>
};

export default Project;
