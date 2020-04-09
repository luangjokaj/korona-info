import 'core-js';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Col } from 'cherry-grid';
import { Loading } from '../Layout';
import { Icon } from '../../assets/svg';
const styles = require('./Country.css');

interface CountryProps {
	xs: number;
	lg: number;
	className?: boolean;
	countrySlug: string;
	countryFlag: string;
	label?: string;
	isKs?: boolean;
	noBorder?: boolean;
}

function Country({
	xs,
	lg,
	countrySlug,
	countryFlag,
	className,
	label,
	isKs,
	noBorder,
}: CountryProps) {
	const [posts, setPosts] = useState<any>([]);

	const API = 'https://corona.lmao.ninja/countries/' + countrySlug;

	const loadPosts = () => {
		fetch(API)
			.then((response) => response.json())
			.then((data) => {
				setPosts(data);
			});
	};

	const loadKs = () => {
		fetch('https://covidks.s3.amazonaws.com/data.json')
			.then((response) => response.json())
			.then((data) => {
				setPosts(data);
			});
	};

	const startWatching = () => {
		setInterval(() => {
			!isKs ? loadPosts() : loadKs();
		}, 60000);
	};

	useEffect(() => {
		!isKs ? loadPosts() : loadKs();
		startWatching();
	}, []);

	return (
		<Col
			xs={xs}
			lg={lg}
			className={classNames(styles.country, className, {
				[styles.noBorder]: noBorder,
			})}
		>
			{posts.length <= 0 && (
				<div className={styles.loaderPlaceholder}>
					<Loading red />
				</div>
			)}
			{posts.cases && (
				<div className={styles.innerDetails}>
					<img
						src={`https://korona-info.s3-eu-west-1.amazonaws.com/img/flags/${countryFlag}.svg`}
						alt={label || (posts.country && posts.country)}
						title={label || (posts.country && posts.country)}
					/>
					<h4>{label || (posts.country && posts.country)}</h4>
					<p>
						<Icon type="total" />
						{posts.cases && posts.cases}
					</p>
				</div>
			)}
		</Col>
	);
}

export { Country };
