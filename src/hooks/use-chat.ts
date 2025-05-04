import {create} from 'zustand';
import {State} from '../constants.js';

interface ChatState {
	state: State;
	setState(state: this['state']): void;
}

export const useChat = create<ChatState>(set => ({
	state: State.CHAT,
	setState(state) {
		set({state});
	},
}));
