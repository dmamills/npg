var fs = require('fs'),
	path = require('path'),
	q = require('q'),
	extend = require('./util').extend,
	arrayToString = require('./util').arrayToString;

/* Expose module generator */
module.exports = generator;

/* promises version of fs functions */
var fs_mkdir = q.denodeify(fs.mkdir),
	fs_writefile = q.denodeify(fs.writeFile);

function generator(name,dir,options) {
	var projPath = path.join(dir,name),
		folderExists = fs.existsSync(projPath);

	if(folderExists && !options.force) {
		throw new Error('Folder already exists. If you wish to continue use --force');
	} else {

		if(folderExists) {
			console.log('removing all yo shizz');
		}

		makeDir(projPath)
		.then(makeDir(path.join(projPath,'lib')))
		.then(makeDir(path.join(projPath,'test')))
		.then(writeFile(path.join('.',projPath,'package.json'))(createPackageContent(name,options)))
		.then(writeFile(path.join('.',projPath,'lib/'+name+'.js'))('/* '+ name + ' v0.0.1 */'))
		.then(writeFile(path.join('.',projPath,'test/'+name+'_tests.js'))('var '+name+' = require("../lib/'+name+'.js");'));
	}
}

function makeDir(path) {
	return fs_mkdir(path);
}

function writeFile(path) {
	return function(data){
		fs_writefile(path,data,'utf-8');
	};
}

function createPackageContent(name,options) {
	var data = '{' + '\n\t"name":"' + name +'"';

	if(options.description) {
		data += packageLine('description','"'+ options.description+'"');
	}

	if(options.keywords) {
		data += packageLine('keywords',arrayToString(options.keywords));
	}

	if(options.author) {
		data += packageLine('keywords',JSON.stringify(options.author));
	}

	data += '\n}';

	return data;
}

function packageLine(key,value) {
	return ',\n\t' + '"' + key + '":' + value; 
}

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