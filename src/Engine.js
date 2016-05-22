var Scene = require("./Scene");

function Engine(){
	var that = this;
	this.config = {};
	this.init = function(config){
		that.config = config;
	};
	this.start = function(){
		var scene = new Scene(that.config);
		that.config.scenes[that.config.firstScene](scene);
		//do something with the prepared scene
		console.log(scene);
	};
}
module.exports = Engine;