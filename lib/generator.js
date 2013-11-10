var fs = require('fs'),
	path = require('path'),
	q = require('q');

module.exports = Generator;

function Generator(name,dir,options) {
	console.log(name);
	console.log(dir);
	console.log(options);
}