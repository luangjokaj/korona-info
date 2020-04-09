import React from 'react';
import {
	ViberShareButton,
	ViberIcon,
	TelegramShareButton,
	TelegramIcon,
	WhatsappShareButton,
	WhatsappIcon,
	TwitterShareButton,
	TwitterIcon,
	FacebookShareButton,
	FacebookIcon,
	FacebookShareCount,
} from 'react-share';
const styles = require('./Socials.css');

function Socials() {
	return (
		<ul className={styles.socials}>
			<li className={styles.hide}>
				<ViberShareButton
					url="https://www.korona-info.me/"
					title="Korona-Info - Corona Virus COVID-19 • Uživo ažuriranja iz Crne Gore"
					separator=" - "
					className={styles.shareButton}
				>
					<ViberIcon size={32} round />
				</ViberShareButton>
			</li>
			<li>
				<TelegramShareButton
					url="https://www.korona-info.me/"
					title="Korona-Info - Corona Virus COVID-19 • Uživo ažuriranja iz Crne Gore"
					className={styles.shareButton}
				>
					<TelegramIcon size={32} round />
				</TelegramShareButton>
			</li>
			<li>
				<WhatsappShareButton
					url="https://www.korona-info.me/"
					title="Korona-Info - Corona Virus COVID-19 • Uživo ažuriranja iz Crne Gore"
					separator=" - "
					className={styles.shareButton}
				>
					<WhatsappIcon size={32} round />
				</WhatsappShareButton>
			</li>
			<li>
				<TwitterShareButton
					url="https://www.korona-info.me/"
					title="Korona-Info - Corona Virus COVID-19 • Uživo ažuriranja iz Crne Gore #CoronaInfoCG #coronavirus #covid19"
					className={styles.shareButton}
				>
					<TwitterIcon size={32} round />
				</TwitterShareButton>
			</li>
			<li>
				<FacebookShareButton
					url="https://www.korona-info.me/"
					quote="Korona-Info - Corona Virus COVID-19 • Uživo ažuriranja iz Crne Gore"
					className={styles.shareButton}
				>
					<FacebookIcon size={32} round />
				</FacebookShareButton>
				<FacebookShareCount
					url="https://www.korona-info.me/"
					className={styles.shareCount}
				>
					{(count) => count}
				</FacebookShareCount>
			</li>
		</ul>
	);
}

export { Socials };
