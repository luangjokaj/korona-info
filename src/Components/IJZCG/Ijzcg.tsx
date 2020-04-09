import React from 'react';
import { Col } from 'cherry-grid';
import { Box } from '../Layout';
import { External } from '../../assets/svg';
const styles = require('./Ijzcg.css');

interface IjzcgProps {
	xs: number;
	lg: number;
}

function Ijzcg({ xs, lg }: IjzcgProps) {
	return (
		<Col xs={xs} lg={lg} className={styles.ijczg}>
			<a href="https://www.ijzcg.me/?ref=korona-info.me" target="_blank">
				<Box className={styles.box}>
					<div className={styles.content}>
						<img
							src="https://korona-info.s3-eu-west-1.amazonaws.com/img/ijzcg.png"
							alt="Institut za javno zdravlje Crne Gore"
						/>
						<span>Institut za javno zdravlje Crne Gore IJZCG</span>
					</div>
					<External />
				</Box>
			</a>
		</Col>
	);
}

export { Ijzcg };
