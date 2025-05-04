import {Box, BoxProps} from 'ink';
import React from 'react';
import {useStdoutDimensions} from '../use-stdout-dimensions.js';

export function Window({
	children,
	...props
}: Readonly<{
	children: React.ReactNode;
}> &
	BoxProps) {
	const [_x, y] = useStdoutDimensions();
	return (
		<Box flexDirection="column" height={y} {...props}>
			{children}
		</Box>
	);
}
