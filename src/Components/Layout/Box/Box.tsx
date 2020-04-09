import React from 'react';
import classNames from 'classnames';
const styles = require('./Box.css');

interface BoxProps {
	children: any;
	loaded?: boolean;
	didResize?: boolean;
	className?: string;
}

function Box({ children, loaded, didResize, className }: BoxProps) {
	return (
		<div
			className={classNames(styles.box, className, {
				[styles.loaded]: loaded,
				[styles.didResize]: didResize,
			})}
		>
			{children}
		</div>
	);
}

export { Box };
