import React, {useEffect, useState} from 'react';
import {Box, Newline, Spacer, Text, useApp, useInput} from 'ink';
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
	const [newMessage, setNewMessage] = useState<string>('');
	const [_x, y] = useStdoutDimensions();
	const {exit} = useApp();

	useInput((_, key) => {
		if (key.escape) {
			exit();
		}
	});

	useEffect(() => {
		const initChatStorage = async () => {
			try {
				setChatStorage(await EthChatStorage.create());
			} catch (e) {
				console.error(e);
			}
		};

		initChatStorage();
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

	const handleSubmit = async () => {
		if (!chatStorage) {
			return;
		}

		// const message = input.trim();

		await chatStorage!.sendChatMessage(chatName, newMessage);
		setNewMessage('');
	};

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
			<Box margin={2} borderStyle="single" flexDirection="column">
				{messages.length === 0 && <Text>No messages yet</Text>}
				{messages
					.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1))
					.map(message => (
						<Message message={message} />
					))}
			</Box>
			<Spacer />
			<Box borderStyle="bold">
				<TextInput
					placeholder="Enter your message..."
					value={newMessage}
					onChange={setNewMessage}
					onSubmit={handleSubmit}
				/>
			</Box>
		</Box>
	);
};

export default App;

const Message = ({message}: {message: ChatMessage}) => {
	return (
		<Text key={message.id}>
			<Text color="green" wrap="truncate-end">
				{message.sender}:{' '}
			</Text>
			<Text color="blue">{message.message}</Text>
			<Newline />
		</Text>
	);
};
