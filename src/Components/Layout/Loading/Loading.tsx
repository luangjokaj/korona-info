import React from 'react';
import classNames from 'classnames';
const styles = require('./Loading.css');

interface LoadingProps {
	red?: boolean;
}

function Loading({ red }: LoadingProps) {
	return (
		<div
			className={classNames(styles.loading, {
				[styles.red]: red,
			})}
		>
			<div className={styles.spinner}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export { Loading };
