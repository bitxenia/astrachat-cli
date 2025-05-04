import {Box, Text} from 'ink';
import React from 'react';
import {Menu} from './menu.js';
import {Logo} from './logo.js';

export function Home() {
	return (
		<Box
			alignItems="center"
			justifyContent="center"
			flexDirection="column"
			width="100%"
		>
			<Logo />
			{/* <Text>Astrachat-cli</Text> */}
			<Menu />
		</Box>
	);
}
