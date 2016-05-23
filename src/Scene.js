function Scene(config){
	var that = this;
	this.events = [];
	this.currentEvent = 0;
	this.stage = new PIXI.Container();
	this.background = null;
	this.music = null;
	this.sounds = {};
	this.waiting = false;
	this.finishedWaiting = false;
	this.characters = {};
	this.config = config;
	this.context = {};
	this.insertionPoint = 0;
	this.nextScene = null;
	this.video = null;
	this.keyboard = {};
	this.click = false;

	window.addEventListener('keydown', function (e) {
        that.keyboard[e.keyCode] = true;
    });
    window.addEventListener('keyup', function (e) {
        that.keyboard[e.keyCode] = false;
    });
    window.addEventListener('click', function(e){
    	that.click = true;
    });

    var getKeyCode = function(str){
    	switch(str){
    		case "0": return 48;
    		case "1": return 49;
    		case "2": return 50;
    		case "3": return 51;
    		case "4": return 52;
    		case "5": return 53;
    		case "6": return 54;
    		case "7": return 55;
    		case "8": return 56;
    		case "9": return 57;

    		case "a": return 65;
    		case "b": return 66;
    		case "c": return 67;
    		case "d": return 68;
    		case "e": return 69;
    		case "f": return 70;
    		case "g": return 71;
    		case "h": return 72;
    		case "i": return 73;
    		case "j": return 74;
    		case "k": return 75;
    		case "l": return 76;
    		case "m": return 77;
    		case "n": return 78;
    		case "o": return 79;
    		case "p": return 80;
    		case "q": return 81;
    		case "r": return 82;
    		case "s": return 83;
    		case "t": return 84;
    		case "u": return 85;
    		case "v": return 86;
    		case "w": return 87;
    		case "x": return 88;
    		case "y": return 89;
    		case "z": return 90;

    		case "F1": return 112;
    		case "F2": return 113;
    		case "F3": return 114;
    		case "F4": return 115;
    		case "F5": return 116;
    		case "F6": return 117;
    		case "F7": return 118;
    		case "F8": return 119;
    		case "F9": return 120;
    		case "F10": return 121;
    		case "F11": return 122;
    		case "F12": return 123;

    		case "space": return 32;
    		case " ": return 32;
    		case "enter": return 13;
    		case "return": return 13
    		case "shift": return 16;
    		case "alt": return 18;
    		case "backspace": return 8;
    		case "escape": return 27;
    		case "esc": return 27
    		case "left": return 37;
    		case "up": return 38;
    		case "right": return 39;
    		case "down": return 40;
    		case "tab": return 9;
    		case "caps": return 20;
    		case "186": return 186;
    		case "187": return 187;
    		case "188": return 188;
    		case "189": return 189;
    		case "190": return 190;
    		case "191": return 191;
    		case "192": return 192;
    		case "220": return 220;
    		case "221": return 221;
    		case "222": return 222;
    		case "229": return 229;
    		default: return -1;
    	}
    };

    var anyInput = function(){
    	if(that.click) return true;
    	var keyboard = that.keyboard;
    	for(var index in keyboard) { 
		   if (keyboard.hasOwnProperty(index)) {
		       if(keyboard[index]) return true;
		   }
		}
		return false;
    };

	var isFunction = function(functionToCheck) {
		 var getType = {};
		 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	};

	var sound = function(src) {
	    this.sound = document.createElement("audio");
	    this.sound.src = src;
	    this.sound.setAttribute("preload", "auto");
	    this.sound.setAttribute("controls", "none");
	    this.sound.style.display = "none";
	    document.body.appendChild(this.sound);
	    this.play = function(){
	    	this.sound.currentTime = 0;
	        this.sound.play();
	    }
	    this.pause = function(){
	        this.sound.pause();
	    }
	    this.stop = function(){
	    	this.sound.pause();
	    	this.sound.currentTime = 0;
	    }
	    this.resume = function(){
	    	this.sound.play();
	    }
	    this.loop = function(shouldLoop){
	    	this.sound.loop = shouldLoop;
	    }
	    this.volume = function(intensity){
	    	this.sound.volume = intensity / 100;
	    }
	}

	this.update = function(){
		if(that.events.length <= that.currentEvent) return false;
		var nextEvent = that.events[that.currentEvent](that.stage)
		if(nextEvent){
			that.currentEvent++;
		}
		return true;
	};

	this.UI = function(options){};
	/*
	{
		ui: "normal",
		options: {
			//user defined
		}
	}
	*/
	this.background = function(options){
		/*
		{
				name: "background.jpg",
				transition: "fade"
		}
		*/
		//TODO: transitions
		PIXI.loader.add(options.name);
		var event = function(stage){
			stage.removeChild(that.background);
			that.background = new PIXI.Sprite(PIXI.loader.resources[options.name].texture);
			stage.addChild(that.background);
			return true;
		};
		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
	};
	
	this.playMusic = function(options){
		/*
		{
			name: "music.mp3",
			volume: 50,			// between 0 and 100
			loop: true,
			transition: "fade"
		}
		*/
		//TODO: transitions
		if(!that.sounds[options.name]) that.sounds[options.name] = new sound(options.name);
		var event = function(){
			if(that.music){
				that.music.pause();
				that.music.currentTime = 0;
			}
			var audio = that.sounds[options.name];
			that.music = audio;
			audio.volume(options.volume);
			audio.loop(options.loop);
			audio.play();
			return true;
		};

		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
	};
	
	this.stopMusic = function(options){
		/*
		{
			transition: "fade"
		}
		*/
		//TODO: transitions
		var event = function(){
			that.music.stop();
			return true;
		};

		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
	};

	this.pauseMusic = function(options){
		/*
		{
			transition: "fade"
		}
		*/
		//TODO: transitions
		var event = function(){
			that.music.pause();
			return true;
		};

		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
	};
	this.resumeMusic = function(options){
		/*
		{
			transition: "fade"
		}
		*/
		//TODO: transitions
		var event = function(){
			that.music.resume();
			return true;
		};

		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
	};
	this.playSound = function(options){
		/*
		{
			name: "sound1.mp3",
			volume: 100,
			transition: "instant"
		}
		*/
		//TODO: transitions
		if(!that.sounds[options.name]) that.sounds[options.name] = new sound(options.name);
		var event = function(){
			var audio = that.sounds[options.name];
			audio.volume(options.volume);
			audio.play();
			return true;
		};

		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
	};
	this.addCharacter = function(options){
		/*
		{
			id: "phoenix",
			state: "angry",
			transition: "instant"
		}
		*/
		//TODO: transitions
		//TODO: position correctly
		var texture = that.config.characters[options.id].sprites[options.state];
		PIXI.loader.add(texture);
		var event = function(){
			var previousSprite = that.characters[options.id];
			if(previousSprite){
				that.stage.removeChild(previousSprite); //We need to remove the previous state
			}
			var sprite = new PIXI.Sprite(PIXI.loader.resources[texture].texture);
			that.characters[options.id] = sprite;
			that.stage.addChild(sprite);
			return true;
		};

		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
	};
	this.removeCharacter = function(options){
		/*
		{
			id: "phoenix",
			transition: "fade"
		}
		*/
		var event = function(){
			var previousSprite = that.characters[options.id];
			if(previousSprite){
				that.stage.removeChild(previousSprite); //We need to remove the previous state
			}
			return true;
		};
		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
	};

	this.say = function(options){
		/*
		{
			character: "phoenix", 
			text: "Hello, this is what I have to say...",	//Could be awesome to do some variable interpolation
			speed: 20 	//char per second
		}
		*/
	};
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
	this.setVar = function(options){
		/*
		{
			name: "var1",
			value: 2
		}
		{
			name: "var1",
			value: (context) => context.var1 + 1
		}
		*/
		var event = function(){
			if(isFunction(options.value)) that.context[options.name] = options.value(that.context);
			else that.context[options.name] = options.value;
			return true;
		};

		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
		
	};
	this.if = function(options){
		/*
		{
			condition: (context) => context.var1 == 3,
			then: (scene) => //do something,
			else: (scene) -> //do something else
		}
		*/
		var event = function(){
			that.insertionPoint = that.currentEvent + 1;
			if(options.condition(that.context)) options.then(that);
			else options.else(that);
			return true;
		};

		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
	};
	this.while = function(options){
		/*
		{
			condition: (context) => context.var1 < 10,
			do: (scene) => //do somethings
		}
		*/
		var event = function(){
			if(options.condition(that.context)){
				that.insertionPoint = that.currentEvent + 1;
				options.do(that);
				that.while(options);
			}
			return true;
		};

		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
	};
	this.waitInput = function(options){
		/*
		{
			input: "space" //"any" if it doesn't matter
		}
		*/
		var event = function(){
			if(that.waiting
				&& (that.keyboard[getKeyCode(options.input)]
				|| (options.input === "any" && anyInput())
				|| (options.input === "click" && that.click))){
				that.waiting = false;
				return true;
			}
			else if(!that.waiting){
				that.waiting = true;
				that.click = false;
			}
			else return false;
		};
		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
	};
	this.wait = function(options){;
		/*
		{
			time: "2000" //in millis
		}
		*/
		var event = function(){
			if(!that.waiting){
				that.waiting = true;
				setTimeout(function(){
					that.finishedWaiting = true;
				}, options.time);
			}
			else if(that.waiting && that.finishedWaiting){
				that.waiting = false;
				that.finishedWaiting = false;
				return true;
			}
			return false;
		};
		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
	}
	this.push = function(options){};
	/*
	{
		newScene: "scene2",
		transition: "fade"
	}
	*/
	this.playVideo = function(options){
		/*
		{
			name: "video.mp4",
			volume: 100
			transition: "fade",	
		}
		*/
		var texture = options.name;
		PIXI.loader.add(texture);
		var event = function(){
			if(that.video){
				var source = that.video.texture.baseTexture.source;
				if(source.ended){
					that.stage.removeChild(that.video);
					return true;
				}
			}
			else{
				var videoTexture = PIXI.Texture.fromVideo(options.name);
				that.video = new PIXI.Sprite(videoTexture);
				that.video.width = 640;
				that.video.height = 480;
				that.stage.addChild(that.video);
			}
			return false;
		};

		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
	}
	this.change = function(options){
		/*
		{
			newScene: "scene3",
			transition: "fade",
			clear: true		//to clear or not the previous scene (start from scratch or continue with previous scene's state?)
		}
		*/
		//TODO: transitions and clear
		var event = function(){
			that.nextScene = options.newScene;
		};
		that.events.splice(that.insertionPoint, 0, event);
		that.insertionPoint++;
	};
};
module.exports = Scene;