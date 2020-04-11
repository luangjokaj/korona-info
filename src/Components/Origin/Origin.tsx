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
import originData from '../../local-data/origin.json';
const styles = require('./Origin.css');

interface OriginProps {
	xs: number;
	lg: number;
	loaded: boolean;
	className?: boolean;
}

function Origin({ xs, lg, loaded, className }: OriginProps) {
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

	const [origin, setOrigin] = useState([]);

	const loadData = () => {
		let arr: any = [];

		fetch(
			'https://e.infogram.com/api/live/flex/ce347836-1eae-4cc2-af3a-92dbe813adcb/ef8ddd60-aadd-4205-ae1c-23964b8a3471?',
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
				setOrigin(arr);
			})
			.catch(function () {
				originData.data[0].map((item: any) => {
					const i = parseInt(item[1]);
					if (i > 0) {
						arr.push({
							x: item[0],
							y: i,
						});
					}
				});
				setOrigin(arr);
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
			className={classNames(styles.graphContainerInner, className, {
				[styles.loaded]: origin.length >= 1 && loaded,
				[styles.didResize]: didResize,
			})}
		>
			<div ref={myGraph}>
				<Title smaller>Porijeklo • Origin • Origjina</Title>
				<Box
					loaded={origin.length >= 1 && loaded}
					didResize={didResize}
					className={styles.graphInner}
				>
					{!loaded && origin.length <= 0 && (
						<div className={styles.graphPlaceholder}>
							<Loading red />
						</div>
					)}
					{origin.length > 0 && windowWidth > 0 && (
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
							<XAxis
								tickLabelAngle={
									window.innerWidth > 992 ? 0 : -90
								}
							/>
							<YAxis />
							<VerticalBarSeries
								color={'url(#CoolGradient1)'}
								data={origin}
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

export { Origin };
