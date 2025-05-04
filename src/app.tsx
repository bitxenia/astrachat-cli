import React, {useContext, useEffect, useState} from 'react';
import {Box, Newline, Spacer, Text, useApp, useInput} from 'ink';
import TextInput from 'ink-text-input';
import {ChatMessage} from '@bitxenia/astrachat-eth';
// import {ChatStorage} from './lib/chat-storage.js';
import EthChatStorage from './lib/eth-chat-storage.js';
import {Window} from './ui/window.js';
import {Chat} from './ui/chat.js';
import {
	ChatStorageContext,
	ChatStorageContextProps,
} from './components/providers/chat-storage-provider.js';
import {State} from './constants.js';
import {useChat} from './hooks/use-chat.js';

type Props = {
	chatName: string;
};

const App = ({chatName}: Props) => {
	// const [chatStorage, setChatStorage] = useState<ChatStorage | null>(null);
	// const [messages, setMessages] = useState<ChatMessage[]>([]);
	// const [newMessage, setNewMessage] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const {setChatStorage} =
		useContext<ChatStorageContextProps>(ChatStorageContext);
	const {chatStorage} = useContext(ChatStorageContext);
	const {exit} = useApp();
	const {setState} = useChat();

	useInput((_, key) => {
		if (key.escape) {
			setState(State.MENU);
		}
	});

	useEffect(() => {
		const initChatStorage = async () => {
			try {
				setChatStorage(await EthChatStorage.create());
				setLoading(false);
			} catch (e) {
				console.error(e);
			}
		};

		initChatStorage();
	});

	// useEffect(() => {
	// 	const fetchMessages = async () => {
	// 		if (!chatStorage) {
	// 			return;
	// 		}

	// 		const allMessages = await chatStorage!.getChatMessages(chatName);
	// 		setMessages(allMessages);
	// 	};

	// 	fetchMessages();
	// });

	// const handleSubmit = async () => {
	// 	if (!chatStorage) {
	// 		return;
	// 	}

	// 	// const message = input.trim();

	// 	await chatStorage!.sendChatMessage(chatName, newMessage);
	// 	setNewMessage('');
	// };

	// useEffect(() => {
	// 	const listenToNewMessages = async () => {
	// 		if (!chatStorage) {
	// 			return;
	// 		}

	// 		await chatStorage!.listenToNewMessages(
	// 			chatName,
	// 			(message: ChatMessage) => {
	// 				setMessages(prevMessages => [...prevMessages, message]);
	// 			},
	// 		);
	// 	};
	// 	listenToNewMessages();
	// }, [chatName, messages]);

	return (
		<Window>
			<Chat></Chat>
		</Window>

		// <Box flexDirection="column" height={y}>
		// 	{loading && <Text>Loading...</Text>}
		// 	<Text>{chatName}</Text>
		// 	<Box margin={2} borderStyle="single" flexDirection="column">
		// 		{messages.length === 0 && <Text>No messages yet</Text>}
		// 		{messages
		// 			.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1))
		// 			.map(message => (
		// 				<Message message={message} />
		// 			))}
		// 	</Box>
		// 	<Spacer />
		// 	<Box borderStyle="bold">
		// 		<TextInput
		// 			placeholder="Enter your message..."
		// 			value={newMessage}
		// 			onChange={setNewMessage}
		// 			onSubmit={handleSubmit}
		// 		/>
		// 	</Box>
		// </Box>
	);
};

export default App;

const Message = ({message}: {message: ChatMessage}) => {
	return (
		<Text key={message.id}>
			<Text bold color="green" wrap="truncate-middle">
				{message.sender}:{' '}
			</Text>
			<Text color="blue">{message.message}</Text>
			<Newline />
		</Text>
	);
};
