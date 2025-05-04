import {Box, Spacer, Text} from 'ink';
import TextInput from 'ink-text-input';
import React, {useContext, useEffect, useState} from 'react';
import {ChatStorageContext} from './providers/chat-storage-provider.js';
import {useChat} from '../hooks/use-chat.js';
import {State} from '../constants.js';
import {ChatMessage} from '@bitxenia/astrachat-eth';
import {Message} from './message.js';

export function ChatRoom() {
	const {chatStorage} = useContext(ChatStorageContext);
	const [messages, setMessages] = useState<ChatMessage[]>([]);

	useEffect(() => {
		const fetchMessages = async () => {
			if (!chatStorage) {
				return;
			}

			const allMessages = await chatStorage!.getChatMessages('aloha');
			setMessages(allMessages);
		};

		fetchMessages();
	});

	// const handleSubmitMessage = async () => {
	// 	if (message === '') {
	// 		console.error(`ChatName can't be empty`);
	// 		return;
	// 	}

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
				<Box borderStyle="single"></Box>
				{/* <TextInput
					value={chatName}
					onChange={setChatName}
					onSubmit={handleSubmitMessage}
				/> */}
			</Box>
		</>
	);
}
