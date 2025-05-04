import {Box} from 'ink';
import SelectInput from 'ink-select-input';
import React from 'react';
import {State} from '../constants.js';
import {useChat} from '../hooks/use-chat.js';

export function Menu() {
	const {setState} = useChat();

	const handleSelect = (item: any) => {
		setState(item.value);
	};

	const items = [
		{
			label: 'Home',
			value: State.HOME,
		},
		{
			label: 'Chat',
			value: State.CHAT,
		},
		{
			label: 'Create chat',
			value: State.CREATE_CHAT,
		},
		{
			label: 'Chat room',
			value: State.CHAT_ROOM,
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
