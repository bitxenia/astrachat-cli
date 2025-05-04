import React, {useState} from 'react';
import {useChat} from '../hooks/use-chat.js';
import {Box} from 'ink';
import {State} from '../constants.js';
// import {ChatStorageContext} from './providers/chat-storage-provider.js';
import TextInput from 'ink-text-input';

export function SelectChat() {
	// const {chatStorage} = useContext(ChatStorageContext);
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
			<Box>
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
