var EventEmitter = require("./emit&on");
//继承 EventEmitter 的函数和原型
var Promise = function () {
	EventEmitter.call(this);
}
Promise.prototype = Object.create(EventEmitter.prototype);
Promise.prototype.then=function(sucessFn,errorFn,alwaysFn){
	if(typeof sucessFn === 'function'){
		this.once('sucess' , sucessFn);
	}
	if(typeof errorFn === 'function'){
		this.once('error' , errorFn);
	}
	if(typeof alwaysFn === 'function'){
		this.once('always' , alwaysFn);
	}
	return this;
}
var Derferred  = function(){
	this.state = 'unfulfilled';
	this.promise = new Promise();
}
Derferred.prototype.resolve = function(obj){
	this.state = "fulfilled";
	this.promise.emit('sucess',obj);
}
Derferred.prototype.reject = function(err){
	this.state = "failed";
	this.promise.emit('error',err);
}
Derferred.prototype.always = function(normal){
	this.state = "always";
	this.promise.emit('always',normal);
}
Derferred.prototype.isError = function(){
	var self = this;
	return function(err,data){
		if(err){
			self.reject(err);
		}else{
			self.resolve(data.toString());
		}
	};
}
Derferred.prototype.all = function(promises){
	var count = promises.length;
	var self = this;
	var results = [];
	promises.forEach(function(promise,index){
		promise.then(function(data){
			count --;
			results[index] = data;
			if(count == 0){
				self.resolve(results);
			}
		},function(err){
			self.reject(err);
		})
	});
	return this.promise;
}

var em = new Promise();
em.on("a",function(msg){
	console.log("你好 "+msg);
});
em.emit("a","test");
module.exports = Derferred;