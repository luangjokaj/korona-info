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
import montenegroData from '../../local-data/historical/montenegro.json';
import albaniaData from '../../local-data/historical/albania.json';
import bulgariaData from '../../local-data/historical/bulgaria.json';
import bosniaData from '../../local-data/historical/bosnia.json';
import croatiaData from '../../local-data/historical/croatia.json';
import kosovoData from '../../local-data/historical/kosovo.json';
import macedoniaData from '../../local-data/historical/macedonia.json';
import serbiaData from '../../local-data/historical/serbia.json';
import sloveniaData from '../../local-data/historical/slovenia.json';
const styles = require('./Balkan.css');

interface BalkanProps {
	xs: number;
	lg: number;
	loaded: boolean;
	className?: boolean;
}

function Balkan({ xs, lg, loaded, className }: BalkanProps) {
	const [mneHistory, setMneHistory] = useState([]);
	const [alHistory, setAlHistory] = useState([]);
	const [bgHistory, setBgHistory] = useState([]);
	const [bihHistory, setBihHistory] = useState([]);
	const [hrHistory, setHrHistory] = useState([]);
	const [ksHistory, setKsHistory] = useState([]);
	const [mkHistory, setMkHistory] = useState([]);
	const [rsHistory, setRsHistory] = useState([]);
	const [siHistory, setSiHistory] = useState([]);
	const [fullWindowWidth, setFullWindowWidth] = useState();
	const [didResize, setDidResize] = useState(false);
	const [hoveredCell, setHoveredCell] = useState(false);

	const myGraph = useRef(null);

	const initiateSize = () => {
		const winWidth =
			window.innerWidth > 992
				? myGraph.current.offsetWidth - 10
				: myGraph.current.offsetWidth - 10;
		setFullWindowWidth(winWidth);
	};

	const loadData = (api, func, localData) => {
		let arr = [];
		fetch(api)
			.then((response) => response.json())
			.then((data) => {
				Object.keys(data.timeline.cases).map(function (key) {
					arr.push({ x: key, y: data.timeline.cases[key] });
					return arr;
				});
				func(arr);
			})
			.catch(function () {
				Object.keys(localData.timeline.cases).map(function (key) {
					arr.push({ x: key, y: localData.timeline.cases[key] });
					return arr;
				});
				func(arr);
				console.log('Error fetching data 🚨');
			});
	};

	function handleResize() {
		initiateSize();
		setDidResize(!didResize);
		console.log('Resized 🖥');
	}

	window.addEventListener('resize', handleResize);

	useEffect(() => {
		loadData(
			'https://corona.lmao.ninja/v2/historical/montenegro',
			setMneHistory,
			montenegroData,
		);
		loadData(
			'https://corona.lmao.ninja/v2/historical/albania',
			setAlHistory,
			albaniaData,
		);
		loadData(
			'https://corona.lmao.ninja/v2/historical/bulgaria',
			setBgHistory,
			bulgariaData,
		);
		loadData(
			'https://corona.lmao.ninja/v2/historical/bosnia',
			setBihHistory,
			bosniaData,
		);
		loadData(
			'https://corona.lmao.ninja/v2/historical/croatia',
			setHrHistory,
			croatiaData,
		);
		loadData(
			'https://corona.lmao.ninja/v2/historical/kosovo',
			setKsHistory,
			kosovoData,
		);
		loadData(
			'https://corona.lmao.ninja/v2/historical/macedonia',
			setMkHistory,
			macedoniaData,
		);
		loadData(
			'https://corona.lmao.ninja/v2/historical/serbia',
			setRsHistory,
			serbiaData,
		);
		loadData(
			'https://corona.lmao.ninja/v2/historical/slovenia',
			setSiHistory,
			sloveniaData,
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
				<Title>Balkan • Balkans • Ballkani</Title>
				<Box
					loaded={mneHistory.length >= 1 && loaded}
					didResize={didResize}
					className={styles.graphInner}
				>
					{mneHistory.length <= 0 &&
						alHistory.length <= 0 &&
						bgHistory.length <= 0 &&
						bihHistory.length <= 0 &&
						hrHistory.length <= 0 &&
						ksHistory.length <= 0 &&
						mkHistory.length <= 0 &&
						rsHistory.length <= 0 &&
						siHistory.length <= 0 && (
							<div className={styles.graphPlaceholder}>
								<Loading red />
							</div>
						)}
					{mneHistory.length >= 1 &&
						alHistory.length >= 1 &&
						bgHistory.length >= 1 &&
						bihHistory.length >= 1 &&
						hrHistory.length >= 1 &&
						ksHistory.length >= 1 &&
						mkHistory.length >= 1 &&
						rsHistory.length >= 1 &&
						siHistory.length >= 1 &&
						fullWindowWidth > 0 && (
							<>
								<XYPlot
									xType="ordinal"
									width={fullWindowWidth}
									height={400}
								>
									<VerticalGridLines />
									<HorizontalGridLines />
									<XAxis tickLabelAngle={-90} />
									<YAxis />
									<LineSeries
										style={{
											stroke: '#89bdf8',
										}}
										data={alHistory}
									/>
									<MarkSeries
										data={alHistory}
										onValueMouseOver={(v) => {
											setHoveredCell(v);
										}}
										onValueMouseOut={() =>
											setHoveredCell(null)
										}
									/>
									<LineSeries
										style={{
											stroke: '#f6cac7',
										}}
										data={bgHistory}
									/>
									<MarkSeries
										data={bgHistory}
										onValueMouseOver={(v) => {
											setHoveredCell(v);
										}}
										onValueMouseOut={() =>
											setHoveredCell(null)
										}
									/>
									<LineSeries
										style={{
											stroke: '#b2e3d8',
										}}
										data={bihHistory}
									/>
									<MarkSeries
										data={bihHistory}
										onValueMouseOver={(v) => {
											setHoveredCell(v);
										}}
										onValueMouseOut={() =>
											setHoveredCell(null)
										}
									/>
									<LineSeries
										style={{
											stroke: '#faa756',
										}}
										data={hrHistory}
									/>
									<MarkSeries
										data={hrHistory}
										onValueMouseOver={(v) => {
											setHoveredCell(v);
										}}
										onValueMouseOut={() =>
											setHoveredCell(null)
										}
									/>
									<LineSeries
										style={{
											stroke: '#a28ddd',
										}}
										data={mkHistory}
									/>
									<MarkSeries
										data={mkHistory}
										onValueMouseOver={(v) => {
											setHoveredCell(v);
										}}
										onValueMouseOut={() =>
											setHoveredCell(null)
										}
									/>
									<LineSeries
										style={{
											stroke: '#e3db5f',
										}}
										data={ksHistory}
									/>
									<MarkSeries
										data={ksHistory}
										onValueMouseOver={(v) => {
											setHoveredCell(v);
										}}
										onValueMouseOut={() =>
											setHoveredCell(null)
										}
									/>
									<LineSeries
										style={{
											stroke: '#acacac',
										}}
										data={rsHistory}
									/>
									<MarkSeries
										data={rsHistory}
										onValueMouseOver={(v) => {
											setHoveredCell(v);
										}}
										onValueMouseOut={() =>
											setHoveredCell(null)
										}
									/>
									<LineSeries
										style={{
											stroke: '#96df7d',
										}}
										data={siHistory}
									/>
									<MarkSeries
										data={siHistory}
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
										data={mneHistory}
									/>
									<MarkSeries
										data={mneHistory}
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
									<li className={styles.red}>Montenegro</li>
									<li className={styles.blue}>Albania</li>
									<li className={styles.skin}>Bulgaria</li>
									<li className={styles.cyan}>BiH</li>
									<li className={styles.orange}>Croatia</li>
									<li className={styles.yellow}>Kosovo</li>
									<li className={styles.violet}>Macedonia</li>
									<li className={styles.gray}>Serbia</li>
									<li className={styles.green}>Slovenia</li>
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

export { Balkan };
