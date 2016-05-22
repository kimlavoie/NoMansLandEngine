module.exports = function(config){
	var that = this;
	this.events = [];
	this.currentEvent = 0;
	this.UI = function(options){};
	/*
	{
		ui: "normal",
		options: {
			//user defined
		}
	}
	*/
	this.background = function(options){};
	/*
	{
			name: "background.jpg",
			transition: "fade"
	}
	*/
	this.playMusic = function(options){};
	/*
	{
		name: "music.mp3",
		volume: 50,			// between 0 and 100
		loop: true,
		transition: "fade"
	}
	*/
	this.stopMusic = function(options){};
	/*
	{
		transition: "fade"
	}
	*/
	this.pauseMusic = function(options){};
	/*
	{
		transition: "fade"
	}
	*/
	this.resumeMusic = function(options){};
	/*
	{
		transition: "fade"
	}
	*/
	this.playSound = function(options){};
	/*
	{
		name: "sound1.mp3",
		volume: 100,
		transition: "instant"
	}
	*/
	this.addCharacter = function(options){};
	/*
	{
		id: "phoenix",
		state: "angry",
		transition: "instant"
	}
	*/
	this.say = function(options){};
	/*
	{
		character: "phoenix", 
		text: "Hello, this is what I have to say...",	//Could be awesome to do some variable interpolation
		speed: 20 	//char per second
	}
	*/
	this.choices = function(options){};
	/*
	[
		{
			text: "First choice",
			action: (scene) => //do something
		}
		//{...}
	]
	*/
	this.setVar = function(options){};
	/*
	{
		name: "var1",
		value: 2
	});
	this.setVar({
		name: "var1",
		value: (context) => context.var1 + 1
	}
	*/
	this.if = function(options){};
	/*
	{
		condition: (context) => context.var1 == 3,
		then: (scene) => //do something,
		else: (scene) -> //do something else
	}
	*/
	this.while = function(options){};
	/*
	{
		condition: (context) => context.var1 < 10,
		do: (scene) => //do somethings
	}
	*/
	this.waitInput = function(options){};
	/*
	{
		input: "space" //"any" if it doesn't matter
	}
	*/
	this.wait = function(options){};
	/*
	{
		time: "2000" //in millis
	}
	*/
	this.push = function(options){};
	/*
	{
		newScene: "scene2",
		transition: "fade"
	}
	*/
	this.playVideo = function(options){};
	/*
	{
		name: "video.mp4",
		volume: 100
		transition: "fade",	
	}
	*/
	this.change = function(options){};
	/*
	{
		newScene: "scene3",
		transition: "fade",
		clear: true		//to clear or not the previous scene (start from scratch or continue with previous scene's state?)
	}
	*/
};