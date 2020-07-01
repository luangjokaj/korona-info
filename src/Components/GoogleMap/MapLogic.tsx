import 'core-js';
import React, { useState, useEffect } from 'react';
import { compose, withProps } from 'recompose';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
} from 'react-google-maps';
import citiesData from '../../local-data/cities.json';
import { mapStyles } from './mapStyles';
const styles = require('./GoogleMap.css');

const GoogleMapComponent = compose(
	withProps({
		googleMapURL:
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyCa1RuhmvYhER1rb421dSeYqWb_WP46yuI&v=3.exp&libraries=geometry,drawing,places',
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: (
			<div
				style={{
					height: `516px`,
					overflow: `hidden`,
				}}
			/>
		),
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withScriptjs,
	withGoogleMap,
)((props: any) => (
	<GoogleMap
		defaultOptions={{ styles: mapStyles }}
		defaultZoom={8}
		defaultCenter={{ lat: 42.674319, lng: 19.255307 }}
	>
		<DynamicMarker />
	</GoogleMap>
));

function DynamicMarker() {
	const [locations, setLocations] = useState([]);
	const [isOpen, setIsOpen] = useState({
		isOpen: false,
		index: null,
	});

	const loadData = () => {
		let arr: any = [];
		fetch(
			'https://e.infogram.com/api/live/flex/ce347836-1eae-4cc2-af3a-92dbe813adcb/a7140478-8c68-46e4-83c6-a9086c501f56?',
		)
			.then((response) => response.json())
			.then((data) => {
				data.data[0].map((item: any) => {
					const latLng = item[3].split(' ');
					arr.push({
						total: parseInt(item[1]),
						name: item[4],
						lat: parseFloat(latLng[0]),
						lng: parseFloat(latLng[1]),
					});
				});
				setLocations(arr);
			})
			.catch(function () {
				citiesData.data[0].map((item: any) => {
					const latLng = item[3].split(' ');
					arr.push({
						total: parseInt(item[1]),
						name: item[4],
						lat: parseFloat(latLng[0]),
						lng: parseFloat(latLng[1]),
					});
				});
				setLocations(arr);
				console.log('Error fetching data 🚨');
			});
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			{locations &&
				locations.length &&
				locations.map(
					(city: any) =>
						city.total > 0 && (
							<Marker
								position={{ lat: city.lat, lng: city.lng }}
								label={city.total.toString()}
								key={city.lat}
								labelClass="labelMarker"
								icon=""
								onClick={() =>
									setIsOpen({
										isOpen: true,
										index: city.name,
									})
								}
							>
								<div>
									{isOpen && isOpen.index === city.name && (
										<InfoWindow
											onCloseClick={() =>
												setIsOpen({
													isOpen: false,
													index: null,
												})
											}
										>
											<span className={styles.innerInfo}>
												{city.name}:{' '}
												<strong>
													{city.total.toString()}
												</strong>
											</span>
										</InfoWindow>
									)}
								</div>
							</Marker>
						),
				)}
		</>
	);
}

export { GoogleMapComponent as MapLogic };
