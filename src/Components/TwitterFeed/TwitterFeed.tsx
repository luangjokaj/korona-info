import React, { useState } from 'react';
import classNames from 'classnames';
import { Col } from 'cherry-grid';
import { Twitter } from '../../assets/svg';
import { Timeline } from 'react-twitter-widgets';
const styles = require('./TwitterFeed.css');

function TwitterFeed() {
	const [firstTweet, setFirstTweet] = useState(false);
	const [secondTweet, setSecondTweet] = useState(false);
	return (
		<>
			<Col xs={12} lg={4} className={styles.tweets}>
				<div>
					<div
						className={classNames(
							styles.tweetHead,
							styles.tweetSecond,
							{
								[styles.active]: secondTweet,
							},
						)}
					>
						<button onClick={() => setSecondTweet(!secondTweet)}>
							<Twitter />
							<span>@ijzcg</span>
						</button>
						<Timeline
							dataSource={{
								sourceType: 'profile',
								screenName: 'ijzcg',
							}}
							options={{
								username: 'ijzcg',
								height: '940',
							}}
						/>
					</div>
				</div>
			</Col>
			<Col xs={12} lg={4} className={styles.tweets}>
				<div>
					<div
						className={classNames(
							styles.tweetHead,
							styles.tweetFirst,
							{
								[styles.active]: firstTweet,
							},
						)}
					>
						<button onClick={() => setFirstTweet(!firstTweet)}>
							<Twitter />
							<span>@Klinicki_CntCG</span>
						</button>
						<Timeline
							dataSource={{
								sourceType: 'profile',
								screenName: 'klinicki_cntcg',
							}}
							options={{
								username: 'Klinicki_CntCG',
								height: '940',
							}}
						/>
					</div>
				</div>
			</Col>
		</>
	);
}

export { TwitterFeed };
