import React, { useState, useEffect } from 'react';
import InfoContentBlock from '../infoContentBlock/InfoContentBlock';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import MainHeader from '../mainHeader/MainHeader';
import Paragraph from '../paragraph/Paragraph';
import C2ContentCard from '../c2ContentCard/C2ContentCard';
import style from './InfoContainer.module.css';
import Loading from '../loading/Loading';

const InfoContainer = (props) => {
	const { slug } = useParams();
	const [content, setContent] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		axios
			.get(
				`https://artportfoliocora.com/wp-json/custom-api/v1/info_items?slug=${slug}`
			)
			.then((res) => {
				setContent(res.data);
			})
			.then(() => setLoaded(true));
	}, [slug]);

	if (!loaded) {
		return <Loading />;
	}

	if (loaded) {
		return (
			<div className={style.container}>
				<MainHeader content={content.title} />
				{content.content_blocks.map((block) => (
					<div>
						<h2>{block.title}</h2>

						{block.content.map((content) => (
							<div>
								<Paragraph content={content.paragraph} />
								{content.image ? <C2ContentCard image={content.image} /> : null}
							</div>
						))}
					</div>
				))}
			</div>
		);
	}
};
export default InfoContainer;
