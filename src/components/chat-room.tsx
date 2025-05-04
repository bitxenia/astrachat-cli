import {Box, Spacer, Text} from 'ink';

import React, {useEffect, useState} from 'react';
import {useChat} from '../hooks/use-chat.js';

import {ChatMessage} from '@bitxenia/astrachat-eth';
import {Message} from './message.js';
import TextInput from 'ink-text-input';

const MESSAGES_TO_SHOW = 12;

export function ChatRoom() {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [newMessage, setNewMessage] = useState<string>('');
	const {chatName, storage} = useChat();

	useEffect(() => {
		const fetchMessages = async () => {
			if (!storage || !chatName) {
				return;
			}

			const allMessages = await storage!.getChatMessages(chatName!);
			allMessages.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));

			setMessages(allMessages.slice(-MESSAGES_TO_SHOW));
		};

		fetchMessages();
	}, [chatName, storage]);

	useEffect(() => {
		if (!storage) {
			return;
		}

		const listenToNewMessages = async () => {
			await storage!.listenToNewMessages(chatName!, (message: ChatMessage) => {
				setMessages(prevMessages => [
					...prevMessages.slice(-MESSAGES_TO_SHOW - 1),
					message,
				]);
			});
		};

		listenToNewMessages();
	}, [chatName, storage]);

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
			const message = newMessage.trim();
			await storage!.sendChatMessage(chatName!, message);
			setNewMessage('');
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<Box flexDirection="column">
				<Text bold color={'white'}>
					{chatName}
				</Text>
				<Box borderStyle="single" flexDirection="column" margin={2}>
					{messages.map(m => (
						<Message message={m} />
					))}
				</Box>
				<Spacer />
				<Box borderStyle="single" minHeight="10%">
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
