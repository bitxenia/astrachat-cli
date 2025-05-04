import React from 'react';
import {Home} from '../components/home.js';
import {useChat} from '../hooks/use-chat.js';
import {State} from '../constants.js';
import {CreateChat} from '../components/create-chat.js';
import {ChatRoom} from '../components/chat-room.js';
import {SelectChat} from '../components/select-chat.js';
import {SetAccount} from '../components/set-account.js';

export function Chat() {
	const {state} = useChat();
	if (state === State.CREATE_CHAT) return <CreateChat />;
	if (state === State.SELECT_CHAT) return <SelectChat />;
	if (state === State.CHAT_ROOM) return <ChatRoom />;
	if (state === State.SET_ACCOUNT) return <SetAccount />;

	return <Home />;
}
