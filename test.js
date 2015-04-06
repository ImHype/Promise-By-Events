var Deferred = require('./promise');

var fs = require('fs');

var readFile = function(){
	var defer = new Deferred();

	fs.readFile('test.txt',function(err,data){
		if(err){
			defer.reject(err);
		}else{
			defer.reject(data.toString());
		}
	});
	return defer.promise;
}

readFile().then(function(data){
	console.log(data)
},function(err){
	console.log(err);
});