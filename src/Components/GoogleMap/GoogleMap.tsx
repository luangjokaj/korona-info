import React from 'react';
import { Col } from 'cherry-grid';
import { Title, Box, Loading } from '../Layout';
import { MapLogic } from './MapLogic';
const styles = require('./GoogleMap.css');

interface GoogleMapProps {
	xs: number;
	lg: number;
	loaded: boolean;
}

function GoogleMap({ xs, lg, loaded }: GoogleMapProps) {
	return (
		<Col xs={xs} lg={lg} className={styles.googleMap}>
			<Title second>Karta • Map • Harta</Title>
			<Box className={styles.box}>
				{!loaded && <Loading red />}
				{loaded && <MapLogic />}
			</Box>
		</Col>
	);
}

export { GoogleMap };
