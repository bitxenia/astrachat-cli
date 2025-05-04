import {Box, Text} from 'ink';
import React from 'react';

import {useChat} from '../hooks/use-chat.js';
import {useStdoutDimensions} from '../use-stdout-dimensions.js';

export function Status() {
	const {storage, account} = useChat();
	const [x, y] = useStdoutDimensions();

	return (
		<Box
			position="absolute"
			flexDirection="column"
			alignItems="flex-end"
			justifyContent="flex-end"
			minWidth={x}
			marginY={y - 2}
		>
			<Text>{storage ? `storage set` : `storage not set`}</Text>
			<Text>{account ? `${account}` : `account not set`}</Text>
		</Box>
	);
}
