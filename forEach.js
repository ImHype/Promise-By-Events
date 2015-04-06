function forEach(list,callback){
	for(var i = 0 ;i<list.length;i++){
		callback(list[i],i,list);
	}
}
Array.prototype.each=function(callback){
	var self = this ;
	forEach(self,callback);
}
module.exports = Array;