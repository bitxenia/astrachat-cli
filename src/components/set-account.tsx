import React, {useContext, useState} from 'react';
import {useChat} from '../hooks/use-chat.js';
import {Box, Text} from 'ink';

// import {ChatStorageContext} from './providers/chat-storage-provider.js';

import {ChatStorageContext} from './providers/chat-storage-provider.js';
import SelectInput from 'ink-select-input';
import EthChatStorage from '../lib/eth-chat-storage.js';
import {State} from '../constants.js';

export function SetAccount() {
	// const {chatStorage, setChatStorage} = useContext(ChatStorageContext);
	const {setAccount, setState, setStorage} = useChat();

	const handleSelect = async (item: any) => {
		setAccount(item.value);
		const storage = await EthChatStorage.create(item.value);
		setStorage(storage);
		setState(State.HOME);
	};

	const items = [
		{
			label: 'Account #1',
			value: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
		},
		{
			label: 'Account #2',
			value: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
		},
		{
			label: 'Account #3',
			value: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
		},
		{
			label: 'Account #4',
			value: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
		},
	];

	return (
		<>
			<Box>
				<SelectInput items={items} onSelect={handleSelect} />
			</Box>
		</>
	);
}
