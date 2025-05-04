import React from 'react';
import {Home} from '../components/home.js';
import {useChat} from '../hooks/use-chat.js';
import {State} from '../constants.js';
import {Menu} from '../components/menu.js';
import { CreateChat } from '../components/create-chat.js';

export function Chat() {
	const {state} = useChat();
	if (state === State.HOME) return <Home />;
	if (state === State.CHAT) return <Menu />;
    if (state === State.CREATE_CHAT) return <CreateChat />;

	return <Home />;
}
