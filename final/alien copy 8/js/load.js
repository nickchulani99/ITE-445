var loadState={

	preload:function(){
		//add a loading label on screen
		var loadingLabel = game.add.text(game.width/2, 150,
			'loading...', { font:'30px Arial', fill:'#000000'});
		loadingLabel.anchor.setTo(0.5,0.5);

		//display progress bar
		var progressBar= game.add.sprite(game.width/2,200,'progressBar');
		progressBar.anchor.setTo(0.5,0.5);
		game.load.setPreloadSprite(progressBar);

		//load all assest
		game.load.spritesheet('player','assets/player2.png',32,45);
		// game.load.image('wallV', 'assets/wallVertical.png');
		// game.load.image('wallH', 'assets/wallHorizontal.png');
		game.load.image('coin', 'assets/coin.png');
		game.load.image('enemy', 'assets/enemy.png');
		game.load.image('wallH', 'assets/platform180.png');
		game.load.video('storyvideo', 'assets/video.webm');
game.load.audio('alien', [ 'assets/alien.mp3']);

	game.load.audio('bgSong', [ 'assets/title_theme.wav']);

game.load.image('slime', 'assets/slime.png');

game.load.image('back2', 'assets/background2.png');

game.load.image('restart', 'assets/restart.png');

game.load.image('back3', 'assets/background3.png');
game.load.image('won', 'assets/won.png');
game.load.image('control', 'assets/control.png');
game.load.image('how', 'assets/how.png');
game.load.image('back', 'assets/back.png');



//win sound
game.load.audio('win', [ 'assets/win.wav']);



		//load new assets for use in menu state	
		game.load.image('background','assets/background1.png');
		game.load.image('mainbackground','assets/mainbackground.png');

		//jump sound
		game.load.audio('jump',['assets/jump.wav','assets/jump.wav']);
		//take coin sound
		game.load.audio('coin',['assets/coin1.wav']);
		//player die sound
		game.load.audio('dead',['assets/die.wav']);
		game.load.audio('home',['assets/home.wav']);
		game.load.image('pixel','assets/pixel.png');





game.load.image('goal','assets/goal.png');




game.load.image('intro', 'assets/intro.png');
		game.load.image('logo', 'assets/logo.png');
		game.load.image('skip', 'assets/skip.png');
		game.load.image('home', 'assets/home.png');




game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
		game.load.image('jumpButton', 'assets/jumpButton.png');
      game.load.image('rightButton', 'assets/rightButton.png');
      game.load.image('leftButton', 'assets/leftButton.png');


//select level
 game.load.image('levelone', 'assets/levelone.png');
 game.load.image('leveltwo', 'assets/leveltwo.png');
 game.load.image('levelthree', 'assets/levelthree.png');

	},
	create:function(){
		//go to menu state
		game.state.start('menu');
	}
};