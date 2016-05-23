var Scene = require("./Scene");

function Engine(){
	var that = this;
	this.config = {};
	this.renderer = 0;
	this.currentScene = 0;
	this.init = function(config){
		that.config = config;
		that.renderer = new PIXI.autoDetectRenderer(config.renderDimensions.width,config.renderDimensions.height);	//maybe set dimensions in config...
		document.body.appendChild(that.renderer.view);			//maybe set the element in config...
	};
	this.start = function(){
		that.currentScene = new Scene(that.config);
		that.config.scenes[that.config.firstScene](that.currentScene);
		PIXI.loader.load(that.gameloop);
	};
	this.gameloop = function(){
		var shouldContinue = that.currentScene.update();
		// if(shouldContinue){
			if(that.currentScene.nextScene){
				var nextScene = that.currentScene.nextScene;
				that.currentScene = new Scene(that.config);
				that.config.scenes[nextScene](that.currentScene);
				PIXI.loader.load(that.gameloop);
			}
			else{
				that.renderer.render(that.currentScene.stage);
				requestAnimationFrame(that.gameloop);
			}
		// }
		// else{
		// 	console.log("Exiting game loop");
		// }
	};
}
module.exports = Engine;