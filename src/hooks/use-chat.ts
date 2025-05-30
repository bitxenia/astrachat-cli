import {create} from 'zustand';
import {State} from '../constants.js';
import {ChatStorage} from '../lib/chat-storage.js';

interface ChatState {
	state: State;
	setState(state: this['state']): void;
	chatName: string | null;
	setChatName(chat: this['chatName']): void;
	storage: ChatStorage | null;
	setStorage(storage: this['storage']): void;
	account: string;
	setAccount(account: this['account']): void;
}

export const useChat = create<ChatState>(set => ({
	state: State.CHAT,
	setState(state) {
		set({state});
	},
	chatName: null,
	setChatName(chat) {
		set({chatName: chat});
	},
	storage: null,
	setStorage(storage) {
		set({storage});
	},
	account: '',
	setAccount(account) {
		set({account});
	},
}));
