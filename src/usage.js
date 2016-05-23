var Engine = require("./Engine");

window.addEventListener("load", init);

function init(){
	var engine = new Engine();
	engine.init({
		characters: {
			phoenix: {
				name: "Phoenix Wright",
				sprites: {
					idle: "images/phoenix_idle.jpg",		//maybe use patterns as shortcut (e.g.: phoenix_*.jpg)
					angry: "images/phoenix_angry.png"
					//...
				},
				voice: "phoenix.mp3",
				color: "blue" //or hex value (#0000ff)
			}
			//...
		},
		scenes: {
			intro: scene_features,
			scene2: scene2
			//...
		},
		uis: {
			normal: primitives,
			inventory: inventory
			//...
		},
		firstScene: "intro"
	});
	engine.start();
};


function scene_features(scene){
	/*
	scene.UI({
		ui: "normal",
		options: {
			//user defined
		}
	});
*/
	// scene.wait({
	// 	time: "2000" //in millis
	// });
	// scene.background({
	// 		name: "images/background.jpg",
	// 		transition: "fade"
	// });
	
	// scene.playMusic({
	// 	name: "audio/music.mp3",
	// 	volume: 60,			// between 0 and 100
	// 	loop: true,
	// 	transition: "fade"
	// });

	// scene.wait({
	// 	time: "10000" //in millis
	// });
	
	// scene.stopMusic({
	// 	transition: "fade"
	// });
	
	// scene.pauseMusic({
	// 	transition: "fade"
	// });
	// scene.wait({
	// 	time: "2000" //in millis
	// });
	// scene.resumeMusic({
	// 	transition: "fade"
	// });
	
	// scene.playSound({
	// 	name: "audio/sound.mp3",
	// 	volume: 100,
	// 	transition: "instant"
	// });
	
	// scene.addCharacter({
	// 	id: "phoenix",
	// 	state: "angry",
	// 	transition: "instant"
	// });

	// scene.setVar({
	// 	name: "var1",
	// 	value: 41
	// });
	// scene.setVar({
	// 	name: "var1",
	// 	value: (context) => context.var1 + 1
	// });
	// scene.if({
	// 	condition: (context) => context.var1 === 42,
	// 	then: function(scene){
	// 		scene.playMusic({
	// 			name: "audio/music.mp3",
	// 			volume: 60,			// between 0 and 100
	// 			loop: true,
	// 			transition: "fade"
	// 		});
	// 		console.log("playing music");
	// 	},
	// 	else: (scene) => scene.stopMusic({
	// 		transition: "fade"
	// 	})
	// });

	// scene.wait({
	// 	time: "2000" //in millis
	// });

	// scene.removeCharacter({
	// 	id: "phoenix",
	// 	transition: "fade"
	// });

	// scene.setVar({
	// 	name: "var1",
	// 	value: (context) => context.var1 + 1
	// });
	// scene.if({
	// 	condition: (context) => context.var1 === 42,
	// 	then: (scene) => scene.playMusic({
	// 		name: "audio/music.mp3",
	// 		volume: 60,			// between 0 and 100
	// 		loop: true,
	// 		transition: "fade"
	// 	}),
	// 	else: (scene) => scene.stopMusic({
	// 		transition: "fade"
	// 	})
	// });

	// scene.say({
	// 	character: "phoenix", 
	// 	text: "Hello, this is what I have to say...",	//Could be awesome to do some variable interpolation
	// 	speed: 20 	//char per second
	// });
	// scene.choices([
	// 	{
	// 		text: "First choice",
	// 		action: (scene) => //do something
	// 	}
	// 	//{...}
	// ]);
	// scene.setVar({
	// 	name: "var1",
	// 	value: 2
	// });
	// scene.setVar({
	// 	name: "var1",
	// 	value: (context) => context.var1 + 1
	// });
	// scene.if({
	// 	condition: (context) => context.var1 == 3,
	// 	then: (scene) => //do something,
	// 	else: (scene) -> //do something else
	// });
	// scene.while({
	// 	condition: (context) => context.var1 < 10,
	// 	do: function(scene){ //do somethings
	// 		console.log("looping!");
	// 		scene.setVar({
	// 			name: "var1",
	// 			value: (context) => context.var1 + 1
	// 		})
	// 	}
	// });
	// scene.waitInput({
	// 	input: "space" //"any" if it doesn't matter
	// });
	// scene.wait({
	// 	time: "2000" //in millis
	// });
	// scene.push({
	// 	newScene: "scene2",
	// 	transition: "fade"
	// })
	

	scene.addCharacter({
		id: "phoenix",
		state: "angry",
		transition: "instant"
	});

	scene.waitInput({
		input: "click" //"any" if it doesn't matter
	});

	scene.playVideo({
		name: "video/video.mp4",
		volume: 100,
		transition: "fade",	
	});

	// scene.change({
	// 	newScene: "scene2",
	// 	transition: "fade",
	// 	clear: true		//to clear or not the previous scene (start from scratch or continue with previous scene's state?)
	// });

}

function scene2(scene){
	/*
	scene.say({
		character: "narrator",
		text: "This scene was pushed, now it will be popped and go back to the previous one",
		speed: 50
	});
	scene.pop({
		transition: "instant"
	};
	*/
	console.log("in scene2");
	scene.background({
			name: "images/background2.jpg",
			transition: "fade"
	});
}

function scene3(scene){
	/*
	scene.say({
		character: "narrator",
		text: "THE END",
		speed: -1 	//means instantaneous
	});
*/
}

function primitives(screen, options){
	/*
	screen.image({								//used for both buttons and static pictures
		id: "button1",
		position: {
			x: 0,
			y: 0
		},
		states: {
			idle: "idle_button.jpg",			//maybe use patterns (e.g.: "*_button.jpg")
			inactive: "inactive_button.jpg",
			hovered: "hovered_button.jpg",
			clicked: "clicked_button.jpg"
		},
		hotspots: [
			{
				position: {
					x: 0,
					y, 0
				},
				dimensions: {
					width: 100,
					height: 100
				},
				action: function(){
					screen.setVar({
						name: "another_var",
						value: (context) => context.another_var + 1
					});
					screen.push({
						newScreen: "inventory",
						options: {}
						transition: "instant"
					});
				}
			}
			//...
		]
	});
	screen.text({
		id: "text1",
		text: "Hello the world!",
		position: {
			x: 0,
			y: 0
		},
		font: {
			family: "arial",
			size: 24,
			color: "blue",
			modifiers: ["bold", "italic", "underlined", "striked"]
		}
	});
	screen.rectangle({		//screen.ellipse works exactly the same way
		id: "rect1",
		position: {
			x: 0,
			y: 0
		},
		dimensions: {
			width: 100,
			heigh: 100
		},
		fillColor: "blue",	//undefined if not filled
		strokeColor: "red"	//undefined if no stroke line

	});
	screen.shape({
		id: "triangle1",
		position: {			//translation of the shape
			x: 0,
			y: 0
		},
		points: [			//from x:0, y:0
			{x:5, y:0},
			{x:0, y: 10},
			{x:10, y:10}
		],
		fillColor: "blue",	//undefined if not filled
		strokeColor: "red"	//undefined if no stroke line
	});
*/
};

function inventory(screen, options){
	/*
	screen.image({								//used for both buttons and static pictures
		id: "button1",
		position: {
			x: 0,
			y: 0
		},
		states: {
			idle: "idle_button.jpg",			//maybe use patterns (e.g.: "*_button.jpg")
			inactive: "inactive_button.jpg",
			hovered: "hovered_button.jpg",
			clicked: "clicked_button.jpg"
		},
		hotspots: [
			{
				position: {
					x: 0,
					y, 0
				},
				dimensions: {
					width: 100,
					height: 100
				},
				action: function(context){
					screen.pop({
						transition: "instant"
					});
				}
			}
			//...
		]
	});	
	*/			
}