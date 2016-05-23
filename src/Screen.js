function Screen(config){
	var that = this;
	this.container = new PIXI.Container();

	this.image = function(options){
		/*
		{								//used for both buttons and static pictures
			id: "button1",
			position: {
				x: 0,
				y: 0
			},
			states: {
				idle: "idle_button.jpg",			//maybe use patterns (e.g.: "*_button.jpg")
				hovered: "hovered_button.jpg",
				clicked: "clicked_button.jpg"
			},
			action: function(screen){
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
		}
		*/
		var idle = PIXI.Texture.fromImage(options.states.idle);
		var button = new PIXI.Sprite(idle);
		button.x = options.position.x;
		button.y = options.position.y;
		button.buttonMode = true;
		button.interactive = true;
		that.container.addChild(button);
		if(options.states.hovered){
			var hovered = PIXI.Texture.fromImage(options.states.hovered);
			button.on('mouseover', function(){
				button.texture = hovered;
			});
			button.on('mouseout', function(){
				button.texture = idle;
			})
		}
		if(options.states.clicked){
			var clicked = PIXI.Texture.fromImage(options.states.clicked);
			button.on('mousedown', function(){
				button.texture = clicked;
			});
			button.on('mouseup', function(){
				button.texture = idle;
				options.action();
			})
		}
	};

	this.text = function(options){
		// {
		// 	id: "text1",
		// 	text: "Hello the world!",
		// 	position: {
		// 		x: 0,
		// 		y: 0
		// 	},
		// 	font: {
		// 		font : 'bold italic 36px Arial',
		// 		fill : '#F7EDCA',
		// 		stroke : '#4a1850',
		// 		strokeThickness : 5,
		// 		dropShadow : true,
		// 		dropShadowColor : '#000000',
		// 		dropShadowAngle : Math.PI / 6,
		// 		dropShadowDistance : 6,
		//		 wordWrap : true,
		// 		wordWrapWidth : 440
		// 	}
		// }
		var newText = new PIXI.Text(options.text, options.font);
		newText.x = options.position.x;
		newText.y = options.position.y;
		that.container.addChild(newText);
	};

	this.rectangle = function(options){		//screen.ellipse works exactly the same way
		// {
		// 	id: "rect1",
		// 	position: {
		// 		x: 0,
		// 		y: 0
		// 	},
		// 	dimensions: {
		// 		width: 100,
		// 		height: 100
		// 	},
		// 	lineWidth: 4,
		// 	lineAlpha: 1,
		// 	fillAlpha: 0.5,
		// 	fillColor: 0x0000FF,
		// 	lineColor: 0xFF0000,
		// 	radius: 15
		// }
		var lineWidth = options.lineWidth || 0;
		var lineColor = options.lineColor || 0x00000;
		var lineAlpha = options.lineAlpha || 1;
		var fillColor = options.fillColor || 0xFFFFFF;
		var fillAlpha = options.fillAlpha || 1;
		var radius = options.radius || 1;

		var graphics = new PIXI.Graphics();
		graphics.lineStyle(lineWidth, lineColor, lineAlpha);
		graphics.beginFill(fillColor, fillAlpha);
		graphics.drawRoundedRect(options.position.x, options.position.y,options.dimensions.width, options.dimensions.height, radius);
		graphics.endFill();
		that.container.addChild(graphics);
	};

	this.ellipse = function(options){		//screen.ellipse works exactly the same way
		// {
		// 	id: "ellipse1",
		// 	position: {
		// 		x: 0,
		// 		y: 0
		// 	},
		// 	dimensions: {
		// 		width: 100,
		// 		height: 100
		// 	},
		// 	lineWidth: 4,
		// 	lineAlpha: 1,
		// 	fillAlpha: 0.5,
		// 	fillColor: 0x0000FF,
		// 	lineColor: 0xFF0000,
		// }
		var lineWidth = options.lineWidth || 0;
		var lineColor = options.lineColor || 0x00000;
		var lineAlpha = options.lineAlpha || 1;
		var fillColor = options.fillColor || 0xFFFFFF;
		var fillAlpha = options.fillAlpha || 1;

		var graphics = new PIXI.Graphics();
		graphics.lineStyle(lineWidth, lineColor, lineAlpha);
		graphics.beginFill(fillColor, fillAlpha);
		graphics.drawEllipse(
			options.position.x+options.dimensions.width/2, 
			options.position.y+options.dimensions.height/2,
			options.dimensions.width/2, 
			options.dimensions.height/2
		);
		graphics.endFill();
		that.container.addChild(graphics);
	};

	this.shape = function(options){
		// {
		// 	id: "triangle1",
		// 	position: {			//translation of the shape
		// 		x: 0,
		// 		y: 0
		// 	},
		// 	points: [			//from x:0, y:0
		// 		{x:5, y:0},
		// 		{x:0, y: 10},
		// 		{x:10, y:10}
		// 	],
		// 	lineWidth: 4,
		// 	lineAlpha: 1,
		// 	fillAlpha: 0.5,
		// 	fillColor: 0x0000FF,
		// 	lineColor: 0xFF0000,
		// }
		var lineWidth = options.lineWidth || 0;
		var lineColor = options.lineColor || 0x00000;
		var lineAlpha = options.lineAlpha || 1;
		var fillColor = options.fillColor || 0xFFFFFF;
		var fillAlpha = options.fillAlpha || 1;

		var graphics = new PIXI.Graphics();
		graphics.lineStyle(lineWidth, lineColor, lineAlpha);
		graphics.beginFill(fillColor, fillAlpha);
		graphics.moveTo(options.points[0].x,options.points[0].y);
		for(var i = 1; i < options.points.length; i++){
			graphics.lineTo(options.points[i].x, options.points[i].y);
		}
		graphics.x = options.position.x;
		graphics.y = options.position.y;
		graphics.endFill();
		that.container.addChild(graphics);
	};

	this.dialogBox = function(options){
		that.rectangle({
			id: "dialogBoxRect1",
			position: {
				x: 5,
				y: 345
			},
			dimensions: {
				width: 630,
				height: 130
			},
			lineWidth: 4,
			lineAlpha: 1,
			fillAlpha: 0.5,
			fillColor: 0x0000FF,
			lineColor: 0x5555FF,
			radius: 15
		});
		that.rectangle({
			id: "dialogBoxRect2",
			position: {
				x: 5,
				y: 295
			},
			dimensions: {
				width: 200,
				height: 50
			},
			lineWidth: 4,
			lineAlpha: 1,
			fillAlpha: 0.5,
			fillColor: 0x0000FF,
			lineColor: 0x5555FF,
			radius: 15
		});
		that.text({
				id: "dialogBoxText1",
				text: "Hello the world! I'm really enjoying all this, so please, come see me to say hello to me, thank you!",
				position: {
					x: 15,
					y: 350
				},
				font: {
					font : '25px Arial',
					fill : '#F7EDCA',
					stroke : '#4a1850',
					strokeThickness : 1,
					dropShadow : false,
					dropShadowColor : '#000000',
					dropShadowAngle : Math.PI / 6,
					dropShadowDistance : 6,
					wordWrap : true,
					wordWrapWidth : 610
				}
		});
		that.text({
			id: "dialogBoxText1",
				text: "Phoenix",
				position: {
					x: 30,
					y: 305
				},
				font: {
					font : '25px Arial',
					fill : '#F7EDCA',
					stroke : '#4a1850',
					strokeThickness : 1,
					dropShadow : false,
					dropShadowColor : '#000000',
					dropShadowAngle : Math.PI / 6,
					dropShadowDistance : 6,
					wordWrap : true,
					wordWrapWidth : 610
				}
		})
	};
};
module.exports = Screen;