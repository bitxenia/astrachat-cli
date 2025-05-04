import React, {useEffect, useState} from 'react';
import {Box, Text, useApp, useInput} from 'ink';
import TextInput from 'ink-text-input';
import {ChatMessage} from '@bitxenia/astrachat-eth';
import {ChatStorage} from './lib/chat-storage.js';
import EthChatStorage from './lib/eth-chat-storage.js';
import {useStdoutDimensions} from './use-stdout-dimensions.js';

type Props = {
	chatName: string;
};

const App = ({chatName}: Props) => {
	const [chatStorage, setChatStorage] = useState<ChatStorage | null>(null);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState<string>('');
	const [x, y] = useStdoutDimensions();
	const {exit} = useApp();

	useInput((_, key) => {
		if (key.escape) {
			exit();
		}
	});

	useEffect(() => {
		async () => {
			setChatStorage(await EthChatStorage.create());
		};
	}, [chatName]);

	useEffect(() => {
		const fetchMessages = async () => {
			if (!chatStorage) {
				return;
			}

			const allMessages = await chatStorage!.getChatMessages(chatName);
			setMessages(allMessages);
		};

		fetchMessages();
	});

	// useEffect(() => {
	// 	const listenToNewMessages = async () => {
	// 		await chatStorage!.listenToNewMessages(
	// 			chatName,
	// 			(message: ChatMessage) => {
	// 				setMessages(prevMessages => [...prevMessages, message]);
	// 			},
	// 		);
	// 	};
	// 	listenToNewMessages();
	// }, [chatName]);

	return (
		<Box flexDirection="column" height={y}>
			<Text>{chatName}</Text>
			<Box>
				{messages
					.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1))
					.map(message => (
						<Message message={message} />
					))}
			</Box>
			<Box>
				<TextInput
					placeholder="Enter your message"
					value={input}
					onChange={setInput}
				/>
			</Box>
		</Box>
	);
};

export default App;

const Message = ({message}: {message: ChatMessage}) => {
	return (
		<Text>
			{message.sender}: {message.message}
		</Text>
	);
};
