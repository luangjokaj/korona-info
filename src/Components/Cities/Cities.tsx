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
	Hint,
} from 'react-vis';
import citiesData from '../../local-data/cities.json';
const styles = require('./Cities.css');

interface CitiesProps {
	xs: number;
	lg: number;
	loaded: boolean;
	className?: boolean;
}

function Cities({ xs, lg, loaded, className }: CitiesProps) {
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

	const [locations, setLocations] = useState([]);

	const loadData = () => {
		let arr: any = [];
		fetch(
			'https://e.infogram.com/api/live/flex/ce347836-1eae-4cc2-af3a-92dbe813adcb/e5eac604-42e4-4db9-9d02-72b3a5df193a?',
		)
			.then((response) => response.json())
			.then((data) => {
				data.data[0].map((item: any) => {
					arr.push({
						x: item[4],
						y: parseInt(item[1]),
					});
				});
				setLocations(arr);
			})
			.catch(function () {
				citiesData.data[0].map((item: any) => {
					arr.push({
						x: item[4],
						y: parseInt(item[1]),
					});
				});
				setLocations(arr);

				console.log('Error fetching data 🚨');
			});
	};

	useEffect(() => {
		loadData();
		initiateSize();
	}, []);

	return (
		<Col
			xs={xs}
			lg={lg}
			className={classNames(styles.graphContainerInner, className)}
		>
			<div ref={myGraph}>
				<Title>Gradovi • Cities • Qytetet
				<p>x 100.000 • ljudi • people • njerëz</p>
				</Title>
				<Box
					loaded={locations.length >= 1 && loaded}
					didResize={didResize}
					className={styles.graphInner}
				>
					{locations.length <= 0 && (
						<div className={styles.graphPlaceholder}>
							<Loading red />
						</div>
					)}
					{locations.length > 0 && windowWidth > 0 && (
						<XYPlot
							xType="ordinal"
							width={windowWidth}
							height={400}
						>
							<GradientDefs>
								<linearGradient
									id="CoolGradient1"
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
										stopOpacity={0.3}
									/>
								</linearGradient>
							</GradientDefs>
							<VerticalGridLines />
							<HorizontalGridLines />
							<XAxis tickLabelAngle={-90} />
							<YAxis />
							<VerticalBarSeries
								color={'url(#CoolGradient1)'}
								data={locations}
								onValueMouseOver={(v) => {
									setHoveredCell(v);
								}}
								onValueMouseOut={(v) => setHoveredCell(false)}
							/>
							{hoveredCell && (
								<Hint value={hoveredCell}>
									<Tooltip>{hoveredCell.y}</Tooltip>
								</Hint>
							)}
						</XYPlot>
					)}
				</Box>
			</div>
		</Col>
	);
}

export { Cities };
