var Scene = require("./Scene");

function Engine(){
	var that = this;
	this.config = {};
	this.renderer = 0;
	this.currentScene = 0;
	this.init = function(config){
		that.config = config;
		that.renderer = new PIXI.autoDetectRenderer(640,480);	//maybe set dimensions in config...
		document.body.appendChild(that.renderer.view);			//maybe set the element in config...
	};
	this.start = function(){
		that.currentScene = new Scene(that.config);
		that.config.scenes[that.config.firstScene](that.currentScene);
		that.gameloop();
	};
	this.gameloop = function(){
		var shouldContinue = that.currentScene.update();
		if(shouldContinue){
			console.log(that.currentScene.stage);
			that.renderer.render(that.currentScene.stage);
			requestAnimationFrame(that.gameloop);
		}
		else{
			console.log("Exiting game loop");
		}
	};
}
module.exports = Engine;