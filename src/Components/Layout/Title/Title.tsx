import React from 'react';
import classNnames from 'classnames';
const styles = require('./Title.css');

interface TitleProps {
	children: any;
	className?: string;
	first?: boolean;
	second?: boolean;
	smaller?: boolean;
}

function Title({ children, className, first, second, smaller }: TitleProps) {
	return (
		<h2
			className={classNnames(styles.title, className, {
				[styles.first]: first,
				[styles.second]: second,
				[styles.smaller]: smaller,
			})}
		>
			{children}
		</h2>
	);
}

export { Title };
