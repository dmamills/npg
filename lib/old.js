var fs = require('fs'),
    path = require('path'),
    q = require('q');

var argv=process.argv;
argv.splice(0,2);

if(argv.length<1)
    throw new Error("No Project Name Provided");

//name of project
var project_name = argv[0],
    author = process.env.USER || 'Unknown';


//directory for module
var parentPath=argv[1] || process.cwd(),
    projPath=path.join(parentPath,project_name);

//Promises versions
var fs_exists = q.denodeify(fs.exists),
    fs_mkdir = q.denodeify(fs.mkdir),
    fs_readFile = q.denodeify(fs.readFile),
    fs_writeFile = q.denodeify(fs.writeFile);

function makeDir(p) {
    return fs_mkdir(path.join(projPath,p));
}


function applyTemplate(data) {
    data=data.replace(/@project_name/gm,project_name);
    data=data.replace(/@author/gm,author);
    return data;
}

function writeFile(path) {
    return function(data) {
        fs_writeFile(path,data,'utf-8');
    };
}

function merge(fromPath,targetPath) {
    return fs_readFile(path.join(__dirname,'templates',fromPath),'utf-8')
           .then(applyTemplate)
           .then(writeFile(path.join(projPath,targetPath)));
}

function onRejected(e){
    console.error(e);
}

var makeRoot = makeDir(''),
    makeLib = makeDir('lib'),
    makeTest = makeDir('test'),
    mergePackage = merge('package.json','package.json'),
    mergeTest = merge('test.js','test/'+project_name+'_test.js'),
    mergeLib = merge('lib.js','lib/'+project_name+'.js');

fs_exists(projPath)
        .then(makeRoot)
        .then(makeLib)
        .then(makeTest)
        .then(mergeLib)
        .then(mergePackage)
        .then(mergeTest)
        .fail(onRejected)
        .done();
