var pubsub = {};

(function (q) {
	var list = {};
	q.pubish = function(topic,msg){
        for(var i = 0; i<list[topic].length; i++) {
            list[topic][i](msg);
        }
    }
	q.subscribe = function( topic,listener){

        if(!list[topic]) list[topic] = [];
        list[topic].push(listener);
    }
}(pubsub));

//test

pubsub.subscribe('foo',function(msg){
	console.log(msg);
})
pubsub.pubish('foo',"hello");