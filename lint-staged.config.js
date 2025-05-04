/* eslint-env node */
import path from 'path';
const formatCommand = 'prettier . --check';

export default {
	'*': formatCommand,
};
