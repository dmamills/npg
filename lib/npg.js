#!/usr/bin/env node
var program = require('commander'),
    generator = require('./generator'),
    util = require('util');

program.version('0.0.1')
       .usage('[name] [dir]')
       .option('-a, --author <author>', 'Author "name,email,url"')
       .option('-d, --dependencies <dependencies>', 'Dependencies,"package:version"')
       .option('-D, --description <description>','Module description')
       .option('-l, --license <license>', 'License, MIT,BSD')
       .option('-k, --keywords <keywords>', 'Keywords, comma seperated')
       .option('-dd, --devdependencies <devdependencies>','Dev Dependencies')
       .option('-f, --force','Will overwrite existing directory');


var options = {};

function rsplit(str) {
    return str.split(',');
}

function dsplit(str) {
    d = rsplit(str);
    var dep = {};
    for(var i=0; i < d.length;i++) {
        var tempd = d[i].split(':');
        dep[tempd[0]] = tempd[1];
    }
    return dep;
}


program.on('author',function(n){
  var authorInfo = rsplit(n);
      titles = ['name','email','url'];
  
  options.author = {};

  for(var i =0; i < authorInfo.length;i++) {
     options.author[titles[i]] = authorInfo[i];
  }
});

program.on('dependencies',function(d){
    options.dependencies = dsplit(d);
});


program.on('license',function(l) {
    options.license = l;
});

program.on('keywords',function(kw) {
    options.keywords = rsplit(kw);
});


program.on('devdependencies',function(dd){
    options.devDependencies = dsplit(dd);
});

program.on('description',function(d){
  options.description = d;
});

program.on('force',function() {
  console.log('Using --force! Will overwrite any existing files');
  options.force = true;
});

program.command('*').action(function(name,dir) {
    if(typeof dir !== 'string') {
      console.error('Missing parameters, see npg --help');
      return;
    }    
    generator(name,dir,options);    
});

var arglength = program.parse(process.argv).args.length;

if(arglength === 0) {
  console.error('No parameters provided, see npg --help');
  return;
} 



//console.log(program.parse(process.argv));