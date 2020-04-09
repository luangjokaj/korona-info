import React from 'react';
import classNnames from 'classnames';
const styles = require('./Tooltip.css');

interface TooltipProps {
	children: any;
	className?: string;
}

function Tooltip({ children, className }: TooltipProps) {
	return (
		<div className={classNnames(styles.toolTip, className)}>{children}</div>
	);
}

export { Tooltip };
