var Scene = require("./Scene");

function Engine(){
	var that = this;
	this.config = {};
	this.renderer = 0;
	this.currentScene = 0;
	this.init = function(config){
		that.config = config;
		that.renderer = new PIXI.WebGLRenderer(800,600);	//maybe set dimensions in config...
		document.body.appendChild(that.renderer.view);			//maybe set the element in config...
	};
	this.start = function(){
		that.currentScene = new Scene(that.config);
		that.config.scenes[that.config.firstScene](that.currentScene);
		//do something with the prepared scene
		console.log(that.currentScene);
	};
}
module.exports = Engine;