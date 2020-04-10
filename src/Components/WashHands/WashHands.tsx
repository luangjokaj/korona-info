import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Wave, Check, Close } from '../../assets/svg';
const styles = require('./WashHands.css');

interface WashHandsProps {
	active: boolean;
	onClick: any;
}

function WashHands({ active, onClick }: WashHandsProps) {
	const [seconds, setSeconds] = useState<number>(20);
	let timer: any;

	useEffect(() => {
		if (active) {
			setSeconds(20);
			setTimeout(() => {
				timer = window.setInterval(() => {
					setSeconds((prevTime: number) => prevTime - 1);
				}, 1000);
			}, 1000);
		}
		return () => {
			window.clearInterval(timer);
		};
	}, [active]);

	return (
		<div
			className={classNames(styles.washHands, {
				[styles.active]: active,
			})}
		>
			<span
				className={classNames(styles.counter, {
					[styles.animated]: seconds > 0,
				})}
			>
				<em
					className={classNames({
						[styles.active]: seconds > 0,
					})}
				>
					{seconds}
				</em>
				<button
					onClick={onClick}
					className={classNames({
						[styles.active]: seconds <= 0,
					})}
				>
					<Check />
				</button>
			</span>
			<div className={styles.waveContainer}>
				<Wave />
			</div>
			<button onClick={onClick} className={styles.close}>
				<Close />
			</button>
		</div>
	);
}

export { WashHands };
