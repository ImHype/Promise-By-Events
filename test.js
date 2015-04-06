var Deferred = require('./promise');

var fs = require('fs');

var readFile = function(filename){
	var defer = new Deferred();
	fs.readFile(filename,defer.isError());
	return defer.promise;
}
readFile('test.txt').then(function(data){
	console.log(data)
},function(err){
	console.log(err);
});

//all - test

(function(){
	var readFile1 = readFile('test.txt');
	var readFile2 = readFile('publish.js');

	var defer = new Deferred();	
	defer.all([readFile1,readFile2]).then(function(results){
		for (var i = 0; i < results.length; i++) {
			fs.createWriteStream(Math.random()+'1.txt').write(results[i]);
		};
	},function(err){
		console.log(err);
	})
}())