var fs = require('fs'),
	path = require('path'),
	q = require('q'),
	extend = require('./util').extend,
	arrayToString = require('./util').arrayToString;

/* Expose module generator */
module.exports = Generator;

function Generator(name,dir,options) {
	this.name = name;
	this.dir = dir;
	this.options = options;
	this.projPath = path.join(dir,name);
	writeFile(path.join(this.projPath,'package.json'))(this.createPackageContent());
}

function writeFile(path) {
	return function(data){
		fs.writeFile(path,data,'utf-8');
	};
}

Generator.prototype.createPackageContent = function() {
	var options = this.options;
	var data = ' { "name":"'+this.name+'"';

	if(options.description) {
		data += ',' + '"description":"'+options.description + '"';
	}

	if(options.keywords) {
		data += ',' + '"keywords":';
		data += arrayToString(options.keywords);
	}

	if(options.author) {
		data += ',' + '"author":' + JSON.stringify(options.author);
	}

	data += '}';

	return data;
};

function applyTemplates(data,terms) {
	return function(terms) {
		for(var i =0; i < terms.length;i++) {
			var t = terms[i];
			data = data.replace(t.exp,t.value);
		}
		return data;
	};
}

/*
   APPLY TEMPLATE Format:
   Array, with an object inside containing 'exp': a regular expression to search for (should end with /gm)
   and 'value': the value to insert where found.
*/