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
			label: 'Create chat',
			value: State.CREATE_CHAT,
		},
		{
			label: 'Select chat',
			value: State.SELECT_CHAT,
		},
		{
			label: 'Select Account',
			value: State.SET_ACCOUNT,
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
