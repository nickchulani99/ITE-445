var loadState={

	preload:function(){
		//add a loading label on screen
		var loadingLabel = game.add.text(game.width/2, 150,
			'loading...', { font:'30px Arial', fill:'#ffffff'});
		loadingLabel.anchor.setTo(0.5,0.5);

		//display progress bar
		var progressBar= game.add.sprite(game.width/2,200,'progressBar');
		progressBar.anchor.setTo(0.5,0.5);
		game.load.setPreloadSprite(progressBar);

		//load all assest
		game.load.spritesheet('player','assets/player2.png',20,20);
		game.load.image('wallV', 'assets/wallVertical.png');
		game.load.image('wallH', 'assets/wallHorizontal.png');
		game.load.image('coin', 'assets/coin.png');
		game.load.image('enemy', 'assets/enemy.png');
	
		//load new assets for use in menu state	
		game.load.image('background','assets/background.png');

		//jump sound
		game.load.audio('jump',['assets/jump.ogg','assets/jump.mp3']);
		//take coin sound
		game.load.audio('coin',['assets/coin.ogg','assets/coin.mp3']);
		//player die sound
		game.load.audio('dead',['assets/dead.ogg','assets/dead.mp3']);
		game.load.image('pixel','assets/pixel.png');

	},
	create:function(){
		//go to menu state
		game.state.start('menu');
	}
};