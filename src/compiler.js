const { linter } = require('eslint');

module.exports = {
	process (source, file, compiler) {
		let options = compiler.options;
		let path = file.uri.toLocalFile();
		let messages = linter.verify(source, options.eslint, { filename: path });
		if (messages.length === 0) {
			return source;
		}		
		if (options.embedWarnings === true) {
			source = embedLog(source, messages);
		}		
		
		let filename = file.uri.toRelativeString(global.process.cwd() + '/');
		stdLog(compiler.logger, filename, messages);
	
		if (options.throwOnError) {
			var error = messages.find(x => x.type === 'error');
			if (error) {
				throw new Error(error.message);
			}
		}
		return source;
	}
};


function stdLog (logger, filename, messages) {
	logger.write('ESLint messages for: ' + filename);
	messages.forEach((message, i) => {
		logger.write(`    ${ i+1 }/${messages.length}: ${message.message}:${message.line}:${message.column}`);
	});
}
function embedLog(source, messages) {
	var code = messages
		.map((message, i) => {
			var str = message.message.replace(/'/g, "\\'").replace(/[\r\n]/g, '\\n');
			return `${str}:${message.line}:${message.column}`;
		})
		.map((str, i) => {
			return `console.warn('${i}/${messages.length} ${str}');`;
		})
		.join('\n');

	return '"ESLint middleware messages:";\n' + code + '\n\n' + source;
}