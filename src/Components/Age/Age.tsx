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
import ageData from '../../local-data/age.json';
const styles = require('./Age.css');

interface AgeProps {
	xs: number;
	lg: number;
	loaded: boolean;
	className?: boolean;
}

function Age({ xs, lg, loaded, className }: AgeProps) {
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

	const [age, setAge] = useState([]);

	const loadData = () => {
		let arr: any = [];
		fetch(
			'https://e.infogram.com/api/live/flex/ce347836-1eae-4cc2-af3a-92dbe813adcb/aa537764-a1ce-4ede-9aef-aed50704b9cd?',
		)
			.then((response) => response.json())
			.then((data) => {
				data.data[0].map((item: any) => {
					const i = parseInt(item[1]);
					if (i > 0) {
						arr.push({
							x: item[0],
							y: i,
						});
					}
				});
				setAge(arr);
			})
			.catch(function () {
				ageData.data[0].map((item: any) => {
					const i = parseInt(item[1]);
					if (i > 0) {
						arr.push({
							x: item[0],
							y: i,
						});
					}
				});
				setAge(arr);
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
				<Title smaller>Starost • Age • Mosha</Title>
				<Box
					loaded={age.length >= 1 && loaded}
					didResize={didResize}
					className={styles.graphInner}
				>
					{!loaded && age.length <= 0 && (
						<div className={styles.graphPlaceholder}>
							<Loading red />
						</div>
					)}
					{age.length > 0 && windowWidth > 0 && (
						<XYPlot
							xType="ordinal"
							width={windowWidth}
							height={window.innerWidth > 992 ? 250 : 200}
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
							<XAxis tickLabelAngle={0} />
							<YAxis />
							<VerticalBarSeries
								color={'url(#CoolGradient1)'}
								data={age}
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

export { Age };
