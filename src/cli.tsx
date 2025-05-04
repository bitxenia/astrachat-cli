#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
	Usage
	  $ astrachat-cli

	Options
		--name  Chat name

	Examples
	  $ astrachat-cli --name=Jane
	  Hello, Jane
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
				// isRequired: true,
				default: 'my-chat',
			},
		},
	},
);

const exit = () => {
	process.exit(0);
};

process.on('SIGINT', exit);
process.on('SIGQUIT', exit);
process.on('SIGTERM', exit);

const app = render(<App chatName={cli.flags.name} />);

await app.waitUntilExit();
