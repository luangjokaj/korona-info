import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'cherry-grid';
import { Logo, Mne, Icon, MainIllustration } from '../../assets/svg';
import { Socials } from '../Socials/Socials';
import { Loading } from '../Layout';
import { localData } from '../../local-data/summary';
import historicalData from '../../local-data/historical/montenegro.json';
const styles = require('./Header.css');

function Header() {
	const [loaded, setLoaded] = useState<any>(false);
	const [prevDate, setPrevDate] = useState<any>(null);
	const [cases, setCases] = useState<any>(null);
	const [deathCases, setDeathCases] = useState<any>(null);
	const [testCases, setTestCases] = useState<any>(null);
	const [recovered, setRecovered] = useState<any>(null);
	const [hospitalized, setHospitalized] = useState<any>(null);
	const [surveillanced, setSurveillanced] = useState<any>(null);

	const loadPostsHistory = async () => {
		let arr: any = [];
		await fetch('https://corona.lmao.ninja/v2/historical/montenegro')
			.then((response) => response.json())
			.then((data) => {
				Object.keys(data.timeline.cases).map(function (key) {
					arr.push({ x: key, y: data.timeline.cases[key] });
					return arr;
				});
				const filtered = arr.filter(function (el: any) {
					return el.y > 0;
				});
				setPrevDate(filtered.slice(-1)[0].y);
			})
			.catch(function () {
				Object.keys(historicalData.timeline.cases).map(function (key) {
					arr.push({ x: key, y: historicalData.timeline.cases[key] });
					return arr;
				});
				const filtered = arr.filter(function (el: any) {
					return el.y > 0;
				});
				setPrevDate(filtered.slice(-1)[0].y);
				console.log('Error fetching data 🚨');
			});
	};

	const loadTests = async () => {
		await fetch('https://corona.lmao.ninja/countries/montenegro')
			.then((response) => response.json())
			.then((data) => {
				setTestCases(data.tests);
			})
			.catch(function () {
				setTestCases(localData.tests);
				console.log('Error fetching data 🚨');
			});
	};

	const loadData = async (
		API: string,
		func: any,
		convert: boolean,
		local: any,
	) => {
		await fetch(API)
			.then((response) => response.json())
			.then((data) => {
				if (convert) {
					const convertedType = parseInt(data.data[0][0][0]);
					func(convertedType);
				} else {
					func(data.data[0][0][0]);
				}
			})
			.catch(function () {
				func(local);
				console.log('Error fetching data 🚨');
			});
	};

	async function triggerQuery() {
		await loadPostsHistory();
		await loadTests();
		await loadData(
			'https://e.infogram.com/api/live/flex/ce347836-1eae-4cc2-af3a-92dbe813adcb/d574bfd8-20e5-496a-b532-337f51c5b345?',
			setCases,
			true,
			localData.cases,
		);
		await loadData(
			'https://e.infogram.com/api/live/flex/ce347836-1eae-4cc2-af3a-92dbe813adcb/efe318dc-8f0e-4aea-9c10-12dc0ccf5af4?',
			setDeathCases,
			true,
			localData.deaths,
		);
		await loadData(
			'https://e.infogram.com/api/live/flex/ce347836-1eae-4cc2-af3a-92dbe813adcb/fee15aa5-9bcb-4b59-8645-96c6850b87fa?',
			setRecovered,
			true,
			localData.recovered,
		);
		await loadData(
			'https://e.infogram.com/api/live/flex/ce347836-1eae-4cc2-af3a-92dbe813adcb/2555ef07-168f-484e-822b-af8dabdc6fed?',
			setHospitalized,
			true,
			localData.hospitalized,
		);
		await loadData(
			'https://e.infogram.com/api/live/flex/ce347836-1eae-4cc2-af3a-92dbe813adcb/87d8faf5-1602-4081-bfa6-29c7a96d80df?',
			setSurveillanced,
			true,
			localData.surveillanced,
		);
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
										<span>Slučajevi • Cases • Rastet</span>{' '}
										<strong>
											{cases > localData.cases
												? cases
												: localData.cases}
										</strong>
									</em>
								</li>
								<li className={styles.today}>
									<Icon type="today" />
									<i />
									<em>
										<span>Danas • Today • Sot</span>{' '}
										<strong>
											{cases >= localData.cases
												? cases - prevDate
												: localData.cases - prevDate}
										</strong>
									</em>
								</li>
								<li className={styles.item}>
									<Icon type="deaths" />
									<em>
										<span>Umrlih • Deaths • Vdekje</span>{' '}
										<strong>
											{deathCases >= localData.deaths
												? deathCases
												: localData.deaths}
										</strong>
									</em>
								</li>
								<li className={styles.item}>
									<Icon type="recovered" />
									<em>
										<span>
											Oporavljeni • Recovered • Të shëruar
										</span>{' '}
										<strong>
											{recovered >= localData.recovered
												? recovered
												: localData.recovered}
										</strong>
									</em>
								</li>
								<li className={styles.item}>
									<Icon type="hospitalized" />
									<em>
										<span>
											Hospitalizovanih • Hospitalized • Në
											spital
										</span>{' '}
										<strong>{hospitalized}</strong>
									</em>
								</li>
								<li className={styles.item}>
									<Icon type="infected" />
									<em>
										<span>
											Zaraženi • Infected • Të infektuar
										</span>{' '}
										<strong>
											{cases >= localData.cases
												? cases -
												  deathCases -
												  (localData.recovered >
												  recovered
														? localData.recovered
														: recovered)
												: localData.cases -
												  deathCases -
												  (localData.recovered >
												  recovered
														? localData.recovered
														: recovered)}
										</strong>
									</em>
								</li>
								<li className={styles.item}>
									<Icon type="surveillanced" />
									<em>
										<span>
											Pod nadzorom • Surveillanced • Në
											vëzhgim
										</span>{' '}
										<strong>{surveillanced}</strong>
									</em>
								</li>
								<li className={styles.item}>
									<Icon type="tested" />
									<em>
										<span>
											Testirani • Tested • Të testuar
										</span>{' '}
										<strong>{testCases}</strong>
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
	);
}

export { Header };
