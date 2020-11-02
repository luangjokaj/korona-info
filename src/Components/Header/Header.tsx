import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'cherry-grid';
import {
	Logo,
	Mne,
	Icon,
	MainIllustration,
	HandSanitizer,
} from '../../assets/svg';
import { Socials } from '../Socials/Socials';
import { Loading } from '../Layout';
import { localData } from '../../local-data/summary';
import historicalData from '../../local-data/historical/montenegro.json';
import { WashHands } from '../WashHands';
const styles = require('./Header.css');

function Header() {
	const [loaded, setLoaded] = useState<any>(false);
	const [prevDate, setPrevDate] = useState<any>(null);
	const [data, setData] = useState<any>(null);
	const [washHands, setWashHands] = useState<any>(false);

	const loadPostsHistory = async () => {
		let arr: any = [];
		await fetch('https://corona.lmao.ninja/v2/historical/montenegro')
			.then((response) => response.json())
			.then((data) => {
				const obj = data.timeline.cases;
				setPrevDate(obj[Object.keys(obj)[Object.keys(obj).length - 1]]);
			})
			.catch(function () {
				const obj = historicalData.timeline.cases;
				setPrevDate(obj[Object.keys(obj)[Object.keys(obj).length - 1]]);
				console.log('Error fetching data 🚨');
			});
	};

	const loadData = async () => {
		await fetch('https://corona.lmao.ninja/v2/countries/montenegro')
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				console.log(data);
			})
			.catch(function () {
				setData({});
				console.log('Error fetching data 🚨');
			});
	};

	async function triggerQuery() {
		await loadPostsHistory();
		await loadData();
		setLoaded(true);
	}

	const startWatching = () => {
		setInterval(() => {
			triggerQuery();
			console.log('Data loaded ... ✅');
		}, 60000);
	};

	useEffect(() => {
		triggerQuery();
		startWatching();
	}, []);

	return (
		<>
			<WashHands active={washHands} onClick={() => setWashHands(false)} />
			<header className={styles.wrapper}>
				<Container>
					<Row className={styles.headerRow}>
						<Col className={styles.logoWrapper} xs={12} md={6}>
							<a href="https://www.korona-info.me/">
								<Logo />
								<h1>
									COVID-19{' '}
									<span>
										Uživo ažuriranja iz Crne Gore i Balkana
									</span>
									<em />
								</h1>
							</a>
						</Col>
						<Col xs={12} md={6} className={styles.share}>
							<button
								onClick={() => setWashHands(true)}
								className={styles.handSanitizer}
							>
								<HandSanitizer /> <em>20s</em>
							</button>
							<Socials />
						</Col>
					</Row>
					<Row className={styles.row}>
						<Col xs={12} lg={4} className={styles.col}>
							{!loaded && (
								<div className={styles.numbersPlaceholder}>
									<Loading />
								</div>
							)}
							{loaded && (
								<ul className={styles.stats}>
									<li className={styles.countryName}>
										<Mne />
										<em>
											<strong>Montenegro</strong>
										</em>
									</li>
									<li className={styles.cases}>
										<Icon type="total" />
										<em>
											<span>
												Slučajevi • Cases • Rastet
											</span>{' '}
											<strong>{data.cases}</strong>
										</em>
									</li>
									<li className={styles.today}>
										<Icon type="today" />
										<i />
										<em>
											<span>Danas • Today • Sot</span>{' '}
											<strong>
												{data.todayCases}
											</strong>
										</em>
									</li>
									<li className={styles.item}>
										<Icon type="deaths" />
										<em>
											<span>
												Umrlih • Deaths • Vdekje
											</span>{' '}
											<strong>
												<strong>{data.deaths}</strong>
											</strong>
										</em>
									</li>
									<li className={styles.item}>
										<Icon type="recovered" />
										<em>
											<span>
												Oporavljeni • Recovered • Të
												shëruar
											</span>{' '}
											<strong>{data.recovered}</strong>
										</em>
									</li>
									<li className={styles.item}>
										<Icon type="hospitalized" />
										<em>
											<span>
											Kritični • Critical
												• Kritik
											</span>{' '}
											<strong>{data.critical}</strong>
										</em>
									</li>
									<li className={styles.item}>
										<Icon type="infected" />
										<em>
											<span>
												Zaraženi • Infected • Të
												infektuar
											</span>{' '}
											<strong>
												<strong>{data.active}</strong>
											</strong>
										</em>
									</li>
									<li className={styles.item}>
										<Icon type="tested" />
										<em>
											<span>
												Testirani • Tested • Të testuar
											</span>{' '}
											<strong>{data.tests}</strong>
										</em>
									</li>
								</ul>
							)}
						</Col>
						<Col xs={12} lg={8} className={styles.worldMap}>
							<MainIllustration />
						</Col>
					</Row>
				</Container>
			</header>
		</>
	);
}

export { Header };
