import {Newline, Text} from 'ink';
import React from 'react';
import {ChatMessage} from '@bitxenia/astrachat-eth';

export function Message({message}: {message: ChatMessage}) {
	return (
		<Text key={message.id}>
			<Text bold color="green" wrap="truncate-middle">
				{message.sender}:{' '}
			</Text>
			<Text color="blue">{message.message}</Text>
			<Newline />
		</Text>
	);
}
