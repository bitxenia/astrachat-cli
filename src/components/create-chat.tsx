import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';
import React, {useContext, useState} from 'react';
import {ChatStorageContext} from './providers/chat-storage-provider.js';
import {useChat} from '../hooks/use-chat.js';
import {State} from '../constants.js';

export function CreateChat() {
	const [chatName, setChatName] = useState<string>('');
	const {setState} = useChat();
	const {chatStorage} = useContext(ChatStorageContext);

	const handleSubmitChatName = async () => {
		if (chatName === '') {
			console.error(`ChatName can't be empty`);
			return;
		}

		try {
			await chatStorage?.createChat(chatName);
			setState(State.MENU);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<Box>
				<Text>Insert chat name: </Text>
				<TextInput
					value={chatName}
					onChange={setChatName}
					onSubmit={handleSubmitChatName}
				/>
			</Box>
		</>
	);
}
