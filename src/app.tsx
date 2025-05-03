import React, {useEffect, useState} from 'react';
import {Box, Text, useApp, useInput, useStdout} from 'ink';
import TextInput, {UncontrolledTextInput} from 'ink-text-input';
import {createChatManager} from '@bitxenia/astrachat-eth';

const App = ({chatName: string}) => {
	const chatManager = createChatManager();
	const [chatName, _] = useState<string>('');
	const [messages, setMessage] = useState<string>('');
	const [input, setInput] = useState<string>('');
	const {stdout, write} = useStdout();
	const {exit} = useApp();

	useInput((input, key) => {
		if (key.escape) {
			exit();
		}
	});

	useEffect(() => {
		// const newMessages = chatManager.getMessages(chatName);
	});

	return (
		<Box>
			<Box>
				<Text>{messages}</Text>
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
