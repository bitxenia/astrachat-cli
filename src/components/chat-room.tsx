import {Box, Spacer, Text} from 'ink';
// import TextInput from 'ink-text-input';
import React, {useContext, useEffect, useState} from 'react';
import {ChatStorageContext} from './providers/chat-storage-provider.js';
import {useChat} from '../hooks/use-chat.js';
// import {State} from '../constants.js';
import {ChatMessage} from '@bitxenia/astrachat-eth';
import {Message} from './message.js';
import TextInput from 'ink-text-input';

export function ChatRoom() {
	// const {chatStorage} = useContext(ChatStorageContext);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [newMessage, setNewMessage] = useState<string>('');
	const {chatName, storage} = useChat();

	useEffect(() => {
		const fetchMessages = async () => {
			if (!storage || !chatName) {
				return;
			}

			const allMessages = await storage!.getChatMessages(chatName!);
			setMessages(allMessages);
		};

		fetchMessages();
	}, [storage]);

	const handleSubmitMessage = async () => {
		if (!storage) {
			console.error(`chatStorage not set`);
			return;
		}

		if (newMessage === '') {
			console.error(`ChatName can't be empty`);
			return;
		}

		try {
			await storage!.sendChatMessage(chatName!, newMessage);
			setNewMessage('');
		} catch (e) {
			console.error(e);
		}
	};

	// 	try {
	// 		await chatStorage?.createChat(chatName);
	// 		setState(State.MENU);
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// };

	return (
		<>
			<Box flexDirection="column">
				<Text bold color={'white'}>
					aloha
				</Text>
				<Box borderStyle="single" flexDirection="column" margin={2}>
					{messages
						.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1))
						.map(message => (
							<Message message={message} />
						))}
				</Box>
				<Spacer />
				<Box borderStyle="single">
					<TextInput
						value={newMessage}
						onChange={setNewMessage}
						onSubmit={handleSubmitMessage}
					/>
				</Box>
			</Box>
		</>
	);
}
