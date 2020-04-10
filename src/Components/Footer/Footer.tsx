import React from 'react';
import { Riangle, GitHub } from '../../assets/svg';
const styles = require('./Footer.css');

function Footer() {
	return (
		<footer className={styles.footer}>
			<p className={styles.small}>
				Ovo je web-stranica sa otvorenim kodom za praćenje epidemije
				COVID-19 u Crnoj Gori. Podaci potječu iz miješanog niza izvora,
				uključujući službenu statistiku Instituta za javno zdravlje
				Crne Gore (IJZCG).
			</p>
			<p className={styles.small}>
				This is an open source web-site for tracking the COVID-19
				epidemic in Montenegro. The data comes from a mixed set of
				sources including the official stats from the Institute of
				Public Health of Montenegro (IJZCG).
			</p>
			<p className={styles.small}>
				Kjo është një web-faqe me burim të hapur për gjurmimin e
				epidemisë COVID-19 në Mal të Zi. Të dhënat vijnë nga një grup i
				burimeve të përziera, përfshirë statistikat zyrtare të
				Institutit të Shëndetit Publik të Malit të Zi (IJZCG).
			</p>

			<p className={styles.github}>
				<a
					href="https://github.com/luangjokaj/korona-info/?ref=korona-info.me"
					target="_blank"
				>
					<GitHub />
				</a>
			</p>
			<p>
				Izvori • Sources • Burimet
				<br />
				<a
					href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/?ref=korona-info.me"
					target="_blank"
				>
					World Health Organization
				</a>{' '}
				<em>•</em>
				<a
					href="https://coronavirus.jhu.edu/?ref=korona-info.me"
					target="_blank"
				>
					Johns Hopkins University
				</a>
				<em>•</em>
				<a
					href="https://www.ijzcg.me/?ref=korona-info.me"
					target="_blank"
				>
					IJZCG
				</a>
				<em>•</em>
				<a
					href="https://kosova.health/?ref=korona-info.me"
					target="_blank"
				>
					Kosova Health
				</a>
			</p>
			<a
				href="https://www.riangle.com/?ref=korona-info.me"
				target="_blank"
				className={styles.riangleLink}
			>
				<Riangle />
			</a>
		</footer>
	);
}

export { Footer };
