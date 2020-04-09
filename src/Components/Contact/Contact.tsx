import React, { useState } from 'react';
import classNames from 'classnames';
import { Col } from 'cherry-grid';
import { Phone } from '../../assets/svg';
const styles = require('./Contact.css');

interface ContactProps {
	xs: number;
	lg: number;
}

function Contact({ xs, lg }: ContactProps) {
	const [contact, setContact] = useState(false);
	return (
		<Col xs={xs} lg={lg} className={styles.contact}>
			<div>
				<div
					className={classNames(
						styles.contactHead,
						styles.contactSecond,
						{
							[styles.active]: contact,
						},
					)}
				>
					<button onClick={() => setContact(!contact)}>
						<Phone />
						<span>Kontakt</span>
					</button>
					<div className={styles.body}>
						<strong>
							Nacionalni Call centar za novi koronavirus:
						</strong>{' '}
						<a href="tel:1616">1616</a>
						<p>
							Besplatna SOS linija Inistituta za javno zdravlje.
							Radno vrijeme call centra: svakog dana, od 8 do 23h.
						</p>
						<hr />
						<div className={styles.small}>
							<strong>
								Komunikacija sa Nacionalnim koordinacionim timom
								za zarazne bolesti:
							</strong>{' '}
							<a href="mailto:coronainfocg@gov.me">
								coronainfocg@gov.me
							</a>
							<hr />
							<strong>
								Kancelarija Generalnog sekretarijata Vlade -
								komunikacija sa građanima:
							</strong>{' '}
							<a href="tel:+382 20 482 876">+382 20 482 876</a> •{' '}
							<a href="mailto:kancelarijazagradjane@gsv.gov.me">
								kancelarijazagradjane@gsv.gov.me
							</a>
							<hr />
							<strong>
								Online prijava za crnogorske državljane u
								inostranstvu koji planiraju povratak:
							</strong>{' '}
							<a
								href="https://fillit.typeform.com/to/MtyA3V/?ref=korona-info.me"
								target="_blank"
							>
								https://fillit.typeform.com/to/MtyA3V
							</a>
							<p>
								* Građani se mogu obratiti sa zahtjevom za
								povratak svakog dana od 08 do 20h, i na brojeve
								telefona +382 20 234 111 i +382 20 234 222.
							</p>
							<hr />
							<strong>Ministarstvo zdravlja:</strong>{' '}
							<a
								href="http://www.mzdravlja.gov.me/?ref=korona-info.me"
								target="_blank"
							>
								www.mzdravlja.gov.me
							</a>{' '}
							• <a href="+382 20 412 858">+382 20 412 858</a>
							<p>
								Radno vrijeme od 8 do 22h, subotom od 10 do 14h.
							</p>
							<hr />
							<p>Besplatna linija za psihološku podršku.</p>
							<strong>Klinički centar Crne Gore:</strong>{' '}
							<a href="https://www.kccg.me">www.kccg.me</a> •{' '}
							<a href="tel:1555">1555</a>
							<p>Radno vrijeme svakog dana, od 10 do 19h.</p>
							<hr />
							<strong>Dom zdravlja Podgorica:</strong>{' '}
							<a href="tel:+382 20 481 928">+382 20 481 928</a>
							<br />
							<p>
								<strong>Sužba za psiho-socijalnu pomoć:</strong>
							</p>
							<a href="tel:+382 20 481 929">+382 20 481 929</a> •{' '}
							<a href="tel:+382 67 074 135">+382 67 074 135</a>
							<p>Radno vrijeme svakog dana, od 7 do 21h.</p>
							<hr />
							<strong>Crveni krst Crne Gore</strong>
							<p>
								<strong>Volonterska pomoć:</strong>
							</p>
							<a href="tel:+382 69 194 475">+382 69 194 475</a>
							<p>
								* Broj je namijenjen starijim građanima i drugim
								ranjivim kategorijama, ukoliko im je potrebna
								pomoć volontera za obavljanje kupovine i druge
								obaveze.
							</p>
							<p>
								<strong>Psiho-socijala pomoć:</strong>
							</p>
							<a href="tel:+382 69 194 476">+382 69 194 476</a>
							<p>
								Linije su otvorene od 09 do 18h svakog radnog
								dana, osim nedjelje.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Col>
	);
}

export { Contact };
