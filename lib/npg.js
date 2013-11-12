#!/usr/bin/env node
var program = require('commander'),
    Generator = require('./generator');

program.version('0.0.1')
       .usage('[name] [dir]')
       .option('-a, --author <author>', 'Author "name,email,url"')
       .option('-d, --dependencies <dependencies>', 'Dependencies,"package:version"')
       .option('-D, --description <description>','Module description')
       .option('-l, --license <license>', 'License, MIT,BSD')
       .option('-k, --keywords <keywords>', 'Keywords, comma seperated')
       .option('-dd, --devdependencies <devdependencies>','Dev Dependencies');


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

program.command('*')
       .action(function(name,dir) {
            var generator = new Generator(name,dir,options);
           // generator.create();
       });

program.parse(process.argv);