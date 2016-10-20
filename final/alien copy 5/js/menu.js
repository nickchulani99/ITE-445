// var menuState = {
// 	create: function (){
// 		 game.add.image(0,0,'background');
// 		 game.load.image('logo' , 'assets/logo.png');

// 	var nameLabel = game.add.text(game.width/2,-50,
// 		'Alien Jumper', {font:'50px Arial', fill:'#000000'});
// 	nameLabel.anchor.setTo(0.5,0.5);
// 	game.add.tween(nameLabel).to({y:80},1000).easing(Phaser.Easing.Bounce.Out).start();
// 	game.add.tween(nameLabel).to({y:80},1000).start();
// 	var scoreLabel = game.add.text(game.width/2, game.height/2,
// 		'score:'+game.global.score,
// 		{font:'25px Arial',fill:'#ffffff'});
// 	scoreLabel.anchor.setTo(0.5,0.5);
// 	var startLabel = game.add.text(game.width/2, game.height -80,
// 		'press the SPACEBAR to start', {
// 			font:'25px Arial',fill:'#ffffff'
// 		});
// 	startLabel.anchor.setTo(0.5,0.5);
// 	game.add.tween(startLabel).to({angle: -2},500).to({angle:2},1000).to({angle:0},500).loop().start();
// 	//create new phaser keyboard varaible
// 	//when press call start
// 	var upKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
// 	upKey.onDown.add(this.start,this);
// 	var timer;
// var total = 0;

// 	},
// 	start:function(){
// 			//start the game 
// 		game.state.start('play');
// 	}
// }















var menuState={

		preload: function(){
		game.load.image('mainbackground', 'assets/mainbackground.png');	
		game.load.image('logo' , 'assets/logo.png');
		

	},

		create: function(){

	game.add.image(0,0, 'mainbackground');
	var nameLabel= game.add.text(game.width/2, -50, 'Alien Jumper', {font: '50px Calibri', fill:'#000000'});
	nameLabel.anchor.setTo(0.5, 0.5);
	var tween=game.add.tween(nameLabel);
	game.add.tween(nameLabel).to({y:80},1000).easing(Phaser.Easing.Bounce.Out).start();
	game.add.tween(nameLabel).to({y:80},1000).start();

// 







//
//
//

var scoreLabel = game.add.text(game.width/2, game.height/2,
		'score:'+game.global.score,
		{font:'25px Arial',fill:'#ffffff'});
		scoreLabel.anchor.setTo(0.5,0.5);
















	//logo image
	game.add.image(10,200, 'logo');
		


	game.time.events.add(Phaser.Timer.SECOND * 5, this.fadeState, this);

		game.stage.backgroundColor= '#ffffff';

		game.physics.startSystem(Phaser.Physics. ARCADE);
		game.renderer.renderSession.roundPixels=true;
		
	},
         
         fadeState: function(){
           game.state.start('intro');

         },
	
		
	
};