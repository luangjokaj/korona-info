// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Col } from 'cherry-grid';
import { Title, Box, Loading, Tooltip } from '../Layout';
import {
	XYPlot,
	GradientDefs,
	VerticalGridLines,
	HorizontalGridLines,
	XAxis,
	YAxis,
	VerticalBarSeries,
	LineSeries,
	MarkSeries,
	Hint,
} from 'react-vis';
import casesData from '../../local-data/cases.json';
import hospitalizedData from '../../local-data/hospitalized.json';
import deathsData from '../../local-data/deaths.json';
import recoveredData from '../../local-data/recovered.json';
const styles = require('./Growth.css');

interface GrowthProps {
	xs: number;
	lg: number;
	loaded: boolean;
	className?: boolean;
}

function Growth({ xs, lg, loaded, className }: GrowthProps) {
	const [postHistory, setPostHistory] = useState([]);
	const [postHospitalizedHistory, setPostHospitalizedHistory] = useState([]);
	const [postDeathsHistory, setPostDeathsHistory] = useState([]);
	const [postRecoveredHistory, setPostRecoveredHistory] = useState([]);
	const [windowWidth, setWindowWidth] = useState();
	const [didResize, setDidResize] = useState(false);
	const [hoveredCell, setHoveredCell] = useState(false);

	const myGraph = useRef(null);

	const initiateSize = () => {
		const winWidth = myGraph.current.offsetWidth - 10;
		setWindowWidth(winWidth);
	};

	let resizeTimeout;

	function handleResize() {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(trigger, 1000);

		function trigger() {
			initiateSize();
			setDidResize(!didResize);
			console.log('Resized 🖥');
		}
	}

	window.addEventListener('resize', handleResize);

	const loadData = (API, func, localData) => {
		fetch(API)
			.then((response) => response.json())
			.then((data) => {
				const filteredResults = data.data[0].map((item) => ({
					x: item[0],
					y: parseInt(item[1]),
				}));
				func(filteredResults.splice(1).filter((item) => item.y >= 0));
			})
			.catch(function () {
				const filteredResults = localData.data[0].map((item) => ({
					x: item[0],
					y: parseInt(item[1]),
				}));
				func(filteredResults.splice(1).filter((item) => item.y >= 0));
				console.log('Error fetching data 🚨');
			});
	};

	useEffect(() => {
		loadData(
			'https://e.infogram.com/api/live/flex/ce347836-1eae-4cc2-af3a-92dbe813adcb/45bdc2b3-b433-4dc2-9a4c-792a189cc30e?',
			setPostHistory,
			casesData,
		);
		loadData(
			'https://e.infogram.com/api/live/flex/ce347836-1eae-4cc2-af3a-92dbe813adcb/7006e237-2c7c-40a7-a288-84faba75bbc1?',
			setPostHospitalizedHistory,
			hospitalizedData,
		);
		loadData(
			'https://e.infogram.com/api/live/flex/ce347836-1eae-4cc2-af3a-92dbe813adcb/a5cd0a99-e80c-42a3-a7f7-2f7f64a8ddbb?',
			setPostDeathsHistory,
			deathsData,
		);
		loadData(
			'https://e.infogram.com/api/live/flex/ce347836-1eae-4cc2-af3a-92dbe813adcb/7ef8d49b-d807-47c7-96d4-06f90270b085?',
			setPostRecoveredHistory,
			recoveredData,
		);
		initiateSize();
	}, []);

	return (
		<Col
			xs={xs}
			lg={lg}
			className={classNames(styles.graphContainerInner, className)}
		>
			<div ref={myGraph}>
				<Title first>Rast • Growth • Rritja</Title>
				<Box
					loaded={
						postHistory.length >= 1 &&
						postDeathsHistory.length >= 1 &&
						postRecoveredHistory.length >= 1 &&
						postHospitalizedHistory.length >= 1 &&
						loaded
					}
					didResize={didResize}
					className={styles.graphInner}
				>
					{postHistory.length <= 1 &&
						postDeathsHistory.length <= 1 &&
						postRecoveredHistory.length <= 1 &&
						postHospitalizedHistory.length <= 1 && (
							<div className={styles.graphPlaceholder}>
								<Loading red />
							</div>
						)}
					{postHistory.length >= 1 &&
						postDeathsHistory.length >= 1 &&
						postHospitalizedHistory.length >= 1 &&
						postRecoveredHistory.length >= 1 &&
						windowWidth > 0 && (
							<>
								<XYPlot
									xType="ordinal"
									width={windowWidth}
									height={window.innerWidth > 992 ? 450 : 400}
								>
									<GradientDefs>
										<linearGradient
											id="CoolGradient"
											x1="0"
											x2="0"
											y1="0"
											y2="1"
										>
											<stop
												offset="0%"
												stopColor="#EF5350"
												stopOpacity={0.8}
											/>
											<stop
												offset="100%"
												stopColor="#EF5350"
												stopOpacity={0}
											/>
										</linearGradient>
									</GradientDefs>
									<VerticalGridLines />
									<HorizontalGridLines />
									<XAxis tickLabelAngle={-90} />
									<YAxis />
									<VerticalBarSeries
										color={'url(#CoolGradient)'}
										data={postHistory}
										onValueMouseOver={(v) => {
											setHoveredCell(v);
										}}
										onValueMouseOut={(v) =>
											setHoveredCell(false)
										}
									/>
									<LineSeries
										style={{
											stroke: '#89bdf8',
										}}
										data={postHospitalizedHistory}
									/>
									<MarkSeries
										data={postHospitalizedHistory}
										onValueMouseOver={(v) => {
											setHoveredCell(v);
										}}
										onValueMouseOut={() =>
											setHoveredCell(null)
										}
									/>
									<LineSeries
										style={{
											stroke: '#ff756e',
										}}
										data={postDeathsHistory}
									/>
									<MarkSeries
										data={postDeathsHistory}
										onValueMouseOver={(v) => {
											setHoveredCell(v);
										}}
										onValueMouseOut={() =>
											setHoveredCell(null)
										}
									/>
									<LineSeries
										style={{
											stroke: '#a3ca44',
										}}
										data={postRecoveredHistory}
									/>
									<MarkSeries
										data={postRecoveredHistory}
										onValueMouseOver={(v) => {
											setHoveredCell(v);
										}}
										onValueMouseOut={() =>
											setHoveredCell(null)
										}
									/>
									{hoveredCell && (
										<Hint value={hoveredCell}>
											<Tooltip>{hoveredCell.y}</Tooltip>
										</Hint>
									)}
								</XYPlot>
								<ul className={styles.legends}>
									<li className={styles.blue}>
										Hospitalizovanih
									</li>
									<li className={styles.green}>
										Oporavljenih
									</li>
									<li className={styles.red}>Umrlih</li>
									<li className={styles.right}>
										{hoveredCell && (
											<span>
												{hoveredCell.x}:{' '}
												<strong>{hoveredCell.y}</strong>
											</span>
										)}
									</li>
								</ul>
							</>
						)}
				</Box>
			</div>
		</Col>
	);
}

export { Growth };
