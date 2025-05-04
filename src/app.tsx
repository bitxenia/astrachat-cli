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

const App = () => {
	const {setChatStorage} =
		useContext<ChatStorageContextProps>(ChatStorageContext);

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
			} catch (e) {
				console.error(e);
			}
		};

		initChatStorage();
	});

	return (
		<Window>
			<Chat />
		</Window>
	);
};

export default App;
