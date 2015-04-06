var emitter = function(){
	this.list = {};
}
emitter.prototype.on = function(topic,listener){
	if(!this.list[topic]){
		this.list[topic] = [];
	}
	this.list[topic].push(listener);

}
emitter.prototype.emit = function(topic,message){
	for (var i = 0; i < this.list[topic].length; i++) {
		this.list[topic][i](message);
	};
}

var em = new emitter();

em.on("a",function(msg){
	console.log("你好 "+msg);
});
em.emit("a","许骏宇")