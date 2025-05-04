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
			flexDirection="row"
			alignItems="flex-end"
			justifyContent="flex-start"
			minWidth={x}
			marginY={y - 3}
			borderStyle="classic"
		>
			<Text>{storage ? `storage set` : `storage not set`}</Text>
			<Text bold color={'white'}>
				{' '}
				|{' '}
			</Text>
			<Text>{account ? `${account}` : `account not set`}</Text>
		</Box>
	);
}
