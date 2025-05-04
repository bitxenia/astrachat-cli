import React, {useState} from 'react';
import {useChat} from '../hooks/use-chat.js';
import {Box} from 'ink';
import {State} from '../constants.js';
import TextInput from 'ink-text-input';

export function SelectChat() {
	const [chatName, setChatName] = useState<string>('');
	const {setState, setChatName: setChat} = useChat();

	const handleSubmitChatName = async () => {
		if (chatName === '') {
			setChatName('');
			return;
		}

		setChat(chatName);
		setState(State.CHAT_ROOM);
	};

	return (
		<>
			<Box
				alignSelf="center"
				alignItems="center"
				width="100%"
				justifyContent="center"
			>
				<TextInput
					value={chatName}
					onChange={setChatName}
					onSubmit={handleSubmitChatName}
					placeholder="Enter chat name"
				></TextInput>
			</Box>
		</>
	);
}
