import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';
import React, {useState} from 'react';
import {useChat} from '../hooks/use-chat.js';
import {State} from '../constants.js';

export function CreateChat() {
	const [chatName, setChatName] = useState<string>('');
	const {storage, setState} = useChat();

	const handleSubmitChatName = async () => {
		if (!storage) {
			console.error(`storage not set`);
			return;
		}
		if (chatName === '') {
			console.error(`ChatName can't be empty`);
			return;
		}

		try {
			await storage!.createChat(chatName);
			setState(State.MENU);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Box>
			<Text>Insert chat name: </Text>
			<TextInput
				value={chatName}
				onChange={setChatName}
				onSubmit={handleSubmitChatName}
			/>
		</Box>
	);
}
