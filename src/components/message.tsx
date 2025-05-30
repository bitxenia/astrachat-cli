import {Newline, Text} from 'ink';
import React from 'react';
import {ChatMessage} from '@bitxenia/astrachat-eth';
import {formatTime} from '../lib/time.js';

const MAGIC_NUMBER = 1000;

export function Message({message}: {message: ChatMessage}) {
	return (
		<Text key={message.id}>
			<Text dimColor color="blue">
				{formatTime(message.timestamp * MAGIC_NUMBER)}{' '}
			</Text>
			{/* {message.parentId && <Text italic>{message.parentId}</Text>} */}
			<Text>{message.id} </Text>
			<Newline />
			<Text bold color="green" wrap="truncate-middle">
				{message.sender}:{' '}
			</Text>
			<Text color="blue">{message.message}</Text>
		</Text>
	);
}
