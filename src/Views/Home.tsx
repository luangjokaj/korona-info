import 'core-js';
import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header/Header';
import { Container, Row } from 'cherry-grid';
import { Growth } from '../Components/Growth';
import { GoogleMap } from '../Components/GoogleMap';
import { Cities } from '../Components/Cities';
import { Gender } from '../Components/Gender';
import { Age } from '../Components/Age';
import { Origin } from '../Components/Origin';
import { Ijzcg } from '../Components/IJZCG/Ijzcg';
import { Contact } from '../Components/Contact/Contact';
import { TwitterFeed } from '../Components/TwitterFeed';
import { Balkan } from '../Components/Balkan';
import { World } from '../Components/World';
import { Country } from '../Components/Country/Country';
import { Footer } from '../Components/Footer';
const styles = require('../assets/css/shared.css');

const Home = () => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setLoaded(true);
		}, 500);
	}, []);

	return (
		<>
			<Header />
			<Container className={styles.graphContainer}>
				<Row justifyContent="flex-start">
					<Growth xs={12} lg={6} loaded={loaded} />
					<GoogleMap xs={12} lg={6} loaded={loaded} />
					<Cities xs={12} lg={12} loaded={loaded} />
					<Gender xs={12} lg={2} loaded={loaded} />
					<Age xs={12} lg={10} loaded={loaded} />
					<Ijzcg xs={12} lg={12} />
					<Contact xs={12} lg={4} />
					<TwitterFeed />
					<Balkan xs={12} lg={6} loaded={loaded} />
					<World xs={12} lg={6} loaded={loaded} />
					<Country
						xs={12}
						lg={4}
						countrySlug="../all"
						countryFlag="earth"
						label="Svijet • World • Bota"
						noBorder
					/>
					<Country
						xs={6}
						lg={4}
						countrySlug="albania"
						countryFlag="albania"
					/>
					<Country
						xs={6}
						lg={4}
						countrySlug="bulgaria"
						countryFlag="bulgaria"
					/>
					<Country
						xs={6}
						lg={4}
						countrySlug="bosnia"
						countryFlag="bosnia_and_herzegovina"
					/>
					<Country
						xs={6}
						lg={4}
						countrySlug="croatia"
						countryFlag="croatia"
					/>
					<Country
						xs={6}
						lg={4}
						countrySlug="kosovo"
						countryFlag="kosovo"
						label="Kosovo"
						isKs
					/>
					<Country
						xs={6}
						lg={4}
						countrySlug="macedonia"
						countryFlag="macedonia"
						label="North Macedonia"
					/>
					<Country
						xs={6}
						lg={4}
						countrySlug="serbia"
						countryFlag="serbia"
					/>
					<Country
						xs={6}
						lg={4}
						countrySlug="slovenia"
						countryFlag="slovenia"
					/>
				</Row>
				<Footer />
			</Container>
		</>
	);
};

export default Home;
