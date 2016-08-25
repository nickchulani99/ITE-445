var mainState = {
	
	preload: function() {
		game.load.image('player', 'assets/player.png');
		game.load.image('wallV', 'assets/wallVertical.png');
		game.load.image('wallH','assets/wallHorizontal.png');
		game.load.image('coin', 'assets/coin.png');
	},

	create: function() {
		game.stage.backgroundColor = '#3498db';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.renderer.renderSession.roundRixels = true;

		//coin
		this.coin = game.add.sprite(60,140,'coin');
		game.physics.arcade.enable(this.coin);
		this.coin.anchor.setTo(0.5,0.5);

		//player
		this.player = game.add.sprite(game.width/2, game.height/2, 'player');
		this.player.anchor.setTo(0.5, 0.5);

		game.physics.arcade.enable(this.player);

		this.player.body.gravity.y = 300;

		//control
		this.cursor = game.input.keyboard.createCursorKeys();

		//walls by grouping
		this.walls = game.add.group();
		this.walls.enableBody = true;

		//all vertical
		game.add.sprite(0,0,'wallV',0,this.walls);
		game.add.sprite(480,0,'wallV',0,this.walls);

		//all horizontal
		game.add.sprite(0,0,'wallH',0,this.walls); 
		game.add.sprite(300,0,'wallH',0,this.walls);
		game.add.sprite(0,320,'wallH',0,this.walls);
		game.add.sprite(300,320,'wallH',0,this.walls);

		game.add.sprite(-100,160,'wallH',0,this.walls);
		game.add.sprite(400,160,'wallH',0,this.walls);

		//middle horizontals scaled
		var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
		middleTop.scale.setTo(1.5, 1);

		var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1.5, 1);

		this.walls.setAll('body.immovable', true);

		//score
		this.scoreLabel = game.add.text(30,30,'Score: 0', {
			font: '18px Arial',
			fill: '#ffffff'
		});
		this.score = 0;
	},

	update: function() {
		//add collision
		game.physics.arcade.collide(this.player, this.walls);
		game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);

		this.movePlayer();

		//check for respawn
		if (!this.player.inWorld) {
			this.playerDie();
		}
	},

	movePlayer: function() {
		if (this.cursor.left.isDown) {
			this.player.body.velocity.x = -200;
		}
		else if (this.cursor.right.isDown) {
			this.player.body.velocity.x = 200;
		}
		else {
			this.player.body.velocity.x = 0;
		}

		if (this.cursor.up.isDown && this.player.body.touching.down) {
			this.player.body.velocity.y = -320;
		}
	},

	playerDie: function(){
		game.state.start('main');
	},

	takeCoin: function(player, coin) {
		this.coin.kill();
		this.score += 5;
		this.scoreLabel.text = 'Score: ' + this.score;
	},
};
	
var game = new Phaser.Game(500,	340, Phaser.AUTO, 'gameDiv');

game.state.add('main', mainState);
game.state.start('main');