import React, {useContext, useEffect, useState} from 'react';
import {useInput, Text} from 'ink';

import EthChatStorage from './lib/eth-chat-storage.js';
import {Window} from './ui/window.js';
import {Chat} from './ui/chat.js';
import {
	ChatStorageContext,
	ChatStorageContextProps,
	ChatStorageProvider,
} from './components/providers/chat-storage-provider.js';
import {State} from './constants.js';
import {useChat} from './hooks/use-chat.js';

const App = () => {
	// const {chatStorage, setChatStorage} =
	// 	useContext<ChatStorageContextProps>(ChatStorageContext);
	const {account, storage, setState, setStorage} = useChat();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useInput((_, key) => {
		if (key.escape) {
			setState(State.MENU);
		}
	});

	useEffect(() => {
		const initChatStorage = async () => {
			try {
				if (!storage) {
					setIsLoading(true);
					const storage = await EthChatStorage.create();
					setStorage(storage);
					setIsLoading(false);
				}
			} catch (e) {
				console.error(e);
			}
		};

		initChatStorage();
	}, [storage]);

	if (isLoading) {
		return (
			<Window>
				<Text>Now loading...</Text>
			</Window>
		);
	}

	return (
		<Window>
			<ChatStorageProvider>
				<Chat />
				<Text>{storage ? `storage set` : `storage not set`}</Text>
				<Text>{account ? `${account}` : `account not set`}</Text>
			</ChatStorageProvider>
		</Window>
	);
};

export default App;
