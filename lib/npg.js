var program = require('commander');


program.version('0.0.1')
       .usage('[options] <name> <dir>')
       .option('-a', 'Author "name,email,url"')
       .option('-d', 'Dependencies,"package:version"')
       .option('-l', 'License, MIT,BSD')
       .option('-k', 'Keywords, comma seperated')
       .option('-dd','Dev Dependencies')
       .parse(process.argv);



console.log(program);


