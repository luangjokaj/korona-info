// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Col } from 'cherry-grid';
import { Title, Box, Loading, Tooltip } from '../Layout';
import {
	XYPlot,
	VerticalGridLines,
	HorizontalGridLines,
	XAxis,
	YAxis,
	LineSeries,
	MarkSeries,
	Hint,
} from 'react-vis';
import allData from '../../local-data/historical/all.json';
const styles = require('./World.css');

interface WorldProps {
	xs: number;
	lg: number;
	loaded: boolean;
	className?: boolean;
}

function World({ xs, lg, loaded, className }: WorldProps) {
	const [allHistory, setAllHistory] = useState([]);
	const [hoveredCell, setHoveredCell] = useState(false);
	const [windowWidth, setWindowWidth] = useState();
	const [didResize, setDidResize] = useState(false);

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

	const loadData = (api, func, localData) => {
		let arr = [];
		fetch(api)
			.then((response) => response.json())
			.then((data) => {
				Object.keys(data.cases).map(function (key) {
					arr.push({ x: key, y: data.cases[key] });
					return arr;
				});
				func(arr);
			})
			.catch(function () {
				Object.keys(localData.cases).map(function (key) {
					arr.push({ x: key, y: localData.cases[key] });
					return arr;
				});
				func(arr);
				console.log('Error fetching data 🚨');
			});
	};

	useEffect(() => {
		loadData(
			'https://corona.lmao.ninja/v2/historical/all',
			setAllHistory,
			allData,
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
				<Title>Svijet • World • Bota</Title>
				<Box
					load={allHistory.length >= 1 && loaded}
					didResize={didResize}
					className={styles.graphInner}
				>
					{allHistory.length <= 0 && (
						<div className={styles.graphPlaceholder}>
							<Loading red />
						</div>
					)}
					{allHistory.length >= 1 && windowWidth > 0 && (
						<>
							<XYPlot
								xType="ordinal"
								width={windowWidth}
								height={400}
							>
								<VerticalGridLines />
								<HorizontalGridLines />
								<XAxis tickLabelAngle={-90} />
								<YAxis
									left={window.innerWidth > 992 ? 17 : 10}
								/>
								<LineSeries
									style={{
										stroke: '#ff756e',
									}}
									data={allHistory}
								/>
								<MarkSeries
									data={allHistory}
									onValueMouseOver={(v) => {
										setHoveredCell(v);
									}}
									onValueMouseOut={() => setHoveredCell(null)}
								/>
								{hoveredCell && (
									<Hint value={hoveredCell}>
										<Tooltip>{hoveredCell.y}</Tooltip>
									</Hint>
								)}
							</XYPlot>
							<ul className={styles.legends}>
								<li className={styles.red}>
									Svijet • World • Bota
								</li>
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

export { World };
