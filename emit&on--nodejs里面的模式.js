var emitter = function(){
	this.list = {};
	this.oncelist = {};
}
emitter.prototype.on = function(topic,listener){
	if(!this.list[topic]){
		this.list[topic] = [];
	}
	this.list[topic].push({type:"on",fn:listener});

}
emitter.prototype.once = function(topic,listener){
	if(!this.list[topic]){
		this.list[topic] = [];
	}
	this.list[topic].push({type:"once",fn:listener});
}
emitter.prototype.emit = function(topic,message){
	for (var i = 0; i < this.list[topic].length; i++) {
		this.list[topic][i].fn(message);
		if(this.list[topic][i].type==="once"){
			this.list[topic].splice(i,1);
			console.log("已删除")
		}
	};
}


var em = new emitter();


em.on("a",function(msg){
	console.log("你好 "+msg);
});
em.emit("a","许骏宇");

em.emit("a","许骏宇");

