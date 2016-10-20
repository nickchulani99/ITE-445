var playState = {

	create: function(){
		game.add.image(0,0,'background');

		 game.world.setBounds(1,1, 1500, 500);//-1000,-10000
cursors = game.input.keyboard.createCursorKeys();

		//player
		this.player = game.add.sprite(game.width/8, game.height/2, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 500;

		//player control
		//this.cursor = game.input.keyboard.createCursorKeys();
//player controls
		this.cursor = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture(
			[Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]
		);
		// wasd control
		this.wasd = {
			up: game.input.keyboard.addKey(Phaser.Keyboard.W),
			left: game.input.keyboard.addKey(Phaser.Keyboard.A),
			right: game.input.keyboard.addKey(Phaser.Keyboard.D)
		};
		//walls
		this.walls = game.add.group();
		this.walls.enableBody = true;

this.wal = game.add.group();
		this.wal.enableBody = true;


		//
		//







//timeeeeeeeeeeeeeee

 var me = this;
 
    me.startTime = new Date();
    me.totalTime = 10;
    me.timeElapsed = 0;
 
    me.createTimer();
 
    me.gameTimer = game.time.events.loop(100, function(){
        me.updateTimer();
    });





























		//
		this.music = game.add.audio('bgSong');
        this.music.loop = true;
        this.music.play();


        
		//
		//



var middleBotto = game.add.sprite(290, 140, 'wallH', 0, this.wal);
		middleBotto.scale.setTo(2, 1);











		// game.add.sprite(0, 0, 'wallV', 0, this.walls);
		// game.add.sprite(480, 0, 'wallV', 0, this.walls);

		// game.add.sprite(0, 0, 'wallH', 0, this.walls);
		// game.add.sprite(300,0, 'wallH', 0, this.walls);
		// game.add.sprite(0,320, 'wallH', 0, this.walls);
		// game.add.sprite(300,320, 'wallH', 0, this.walls);

		// game.add.sprite(-100,160, 'wallH',0, this.walls);
		// game.add.sprite(400,160, 'wallH',0, this.walls);

		var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
		middleTop.scale.setTo(1.5, 1);
		var middleBottom = game.add.sprite(10, 340, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);
		//2
		var middletwo = game.add.sprite(90, 140, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);
		//3
		var middlethree = game.add.sprite(50, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);
		//4
		var middlefour = game.add.sprite(250, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);
		//5
		var middlefive = game.add.sprite(400, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);

		//6
		var middlesix = game.add.sprite(650, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);
		//7
		var middleseven = game.add.sprite(750, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);
		//8
		var middleeight = game.add.sprite(1050, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);
		//9
		var middlenine = game.add.sprite(1350, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);
		//10
		var middleten = game.add.sprite(1750, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);
		//11
		var middleeleven = game.add.sprite(1950, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);
		//12
		var middletwelve = game.add.sprite(2250, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);
		//13
		var middlethirten = game.add.sprite(2550, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);
		//14
		var middlefourten = game.add.sprite(2850, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);
		//15
		var middlefiften = game.add.sprite(3050, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1, 1);


this.wal.setAll('body.immovable', true);
		this.walls.setAll('body.immovable', true);

		//coin
		this.coin = game.add.sprite(100, 140, 'coin');
		game.physics.arcade.enable(this.coin);
		this.coin.anchor.setTo(0.5, 0.5);




	this.goal = game.add.sprite(1450, 200, 'goal');
		game.physics.arcade.enable(this.goal);
		this.goal.anchor.setTo(0.5, 0.5);





// this.slimes = game.add.group();
// 		this.slimes.enableBody = true;
// 		//create 10 enemies
// 		this.slimes.createMultiple(30, 'slime');
// 		//call add enemy every 2.2 second
// 		this.time.events.loop(2200, this.addSlimeFromBottom, this);





















		this.scoreLabel = game.add.text(30, 30, 'score: 0',
			{font: '18px Arial', fill: '#ffffff'});
		//this.scoreLabel.anchor.setTo(0.5, 0.5);
		this.scoreLabel.fixedToCamera = true;
		game.global.score = 0;

		//create enemy group
		// this.enemies = game.add.group();
		// this.enemies.enableBody = true;
		//create 10 enemies
		// this.enemies.createMultiple(20, 'enemy');
		//call add enemy every 2.2 second
		//this.time.events.loop(2200, this.addEnemyFromTop, this);
		//this.time.events.loop(2200, this.addEnemyFromBottom, this);


		//sound
		this.jumpSound = game.add.audio('jump');
		this.coinSound = game.add.audio('coin');
		this.deadSound = game.add.audio('dead');
		this.winSound = game.add.audio('win');

		//animation
		this.player.animations.add('right', [1, 2, 3], 10, true);
		//left anim
		this.player.animations.add('left', [5, 6, 7], 10, true);

		this.emitter = game.add.emitter(0,0,15);

		this.emitter.makeParticles('pixel');

		this.emitter.setYSpeed(-150,150);
		this.emitter.setXSpeed(-150,150);

		this.emitter.gravity=0;

		if (!game.device.desktop) {
			this.addMobileInputs();

			this.rotateLabel = game.add.text(game.width/2, game.height/2, '', { font: '30px Arial', fill: '#fff', backgroundColor: '#000' }); 
			this.rotateLabel.anchor.setTo(0.5, 0.5);
			game.scale.onOrientationChange.add(this.orientationChange, this);

			this.orientationChange();
		}
	},

	update: function(){

		

    // if (cursors.left.isDown)
    // {
    //     game.camera.x -= 2;
    // }
    // else if (cursors.right.isDown)
    // {
    //     game.camera.x += 2;
    // }

		//player
		game.physics.arcade.collide(this.player, this.walls);
		this.movePlayer();
		if (!this.player.inWorld){
			this.playerDie();
		}

		//coin
		game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);


game.physics.arcade.overlap(this.player, this.goal, this.win, null, this);




// game.physics.arcade.collide(this.slimes, this.walls);
// 		game.physics.arcade.overlap(this.player, this.slimes, this.playerDie, null, this);


		//enemies
		// game.physics.arcade.collide(this.enemies, this.walls);
		// game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);

		if(!this.player.alive){
			return;
		}


		// if (this.nextEnemyTop < game.time.now) {
		// 	var start = 4000, end = 1000, score = 100;
		// 	var delay = Math.max
		// 			(start - (start - end) * game.global.score / score, end);
		// 	this.addEnemyFromTop();
		// 	this.nextEnemyTop = game.time.now + delay;
		// }
		// if (this.nextEnemyBottom < game.time.now) {
		// 	var start = 4000, end = 1000, score = 100;
		// 	var delay = Math.max(start - (start - end) * game.global.score / score, end);
		// 	this.addEnemyFromBottom();
		// 	this.nextEnemyBottom = game.time.now + delay;
		// }
	},

	movePlayer: function(){
		if (game.input.totalActivePointers == 0) {
			this.moveLeft = false;
			this.moveRight = false;
		}
		if (this.cursor.left.isDown || this.wasd.left.isDown || this.moveLeft){
			 game.camera.x -= 2;
			this.player.body.velocity.x = -200;
			this.player.animations.play('left');
		}
		else if (this.cursor.right.isDown || this.wasd.right.isDown || this.moveRight){
			 game.camera.x += 2;
			this.player.body.velocity.x = 200;
			this.player.animations.play('right');
		}
		else {
			this.player.body.velocity.x = 0;
			this.player.animations.stop();
			this.player.frame = 0;
		}

		if (this.cursor.up.isDown || this.wasd.up.isDown){
			this.jumpPlayer();
		}
	},
	startMenu: function(){
		game.state.start('play');
	},

	playerDie: function(){
		this.music.stop();
		this.player.kill();
		this.deadSound.play();

		this.emitter.x=this.player.x;
		this.emitter.y=this.player.y;
		this.emitter.start(true,800,null,15);
		
	
	game.time.events.add(1000,this.startMenu,this);
	game.camera.shake(0.02,300);

	},

	updateCoinPosition: function(){
		var coinPosition = [
		{x: 140, y: 180}, {x: 260, y: 180},
		{x: 440, y: 140}, {x: 640, y: 140},
		// {x: 130, y: 140}, {x: 170, y: 130},
		];

		for (var i = 0; i < coinPosition.length; i++){
			if(coinPosition[i].x ==this.coin.x) {
				coinPosition.splice(i, 1);
			}
		}
		var newPosition = game.rnd.pick(coinPosition);
		this.coin.reset(newPosition.x, newPosition.y);
	},

	takeCoin: function(player, coin){
		// this.coin.kill();
		this.coin.scale.setTo(0,0);
		game.add.tween(this.coin.scale).to({x:1,y:1},1000).start();
		game.add.tween(this.player.scale).to({x:1.3,y:1.3},100).yoyo(true).start();
		game.global.score += 5;
		this.scoreLabel.text = 'score: ' + game.global.score;
		this.updateCoinPosition();
		this.coinSound.play();
	},














levelMenu: function(){
		game.state.start('level');
	},

	level: function(){
		this.music.stop();
		this.player.kill();
		this.deadSound.play();

		this.emitter.x=this.player.x;
		this.emitter.y=this.player.y;
		this.emitter.start(true,800,null,15);
		
	
	game.time.events.add(1000,this.levelMenu,this);
	game.camera.shake(0.02,300);

	},























win: function(player, goal){
		// this.coin.kill();
		this.goal.scale.setTo(0,0);
		game.add.tween(this.goal.scale).to({x:1,y:1},1000).start();
		game.add.tween(this.player.scale).to({x:1.3,y:1.3},100).yoyo(true).start();
		game.global.score += 5;
		this.scoreLabel.text = 'score: ' + game.global.score;
		this.home();
		this.music.stop();
		this.winSound.play();
	},

home: function(){
			
			game.state.start('won');
		},






	// addSlimeFromBottom: function() {
	// 	var slimeb = this.slimes.getFirstDead();

	// 	if (!slimeb) {
	// 		return;
	// 	}

	// 	//initialize an enemy
	// 	slimeb.anchor.setTo(0.5, 1);
		
	// 	slimeb.reset(game.width/2,1);
		
	// 	slimeb.body.gravity.y = 500;
	// 	slimeb.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
	// 	slimeb.body.bounce.x = 1;
	// 	slimeb.checkWorldBounds = true;
	// 	slimeb.outOfBoundsKill = true;
	// },





//add enemy function
	// addEnemyFromTop: function() {
	// 	//get 1st dead enemy of group
	// 	var enemy = this.enemies.getFirstDead();
	// 	//do nothing if no enemy
	// 	if (!enemy) {
	// 		return;
	// 	}

	// 	//initialize an enemy
	// 	//set anchor to  center bottom
	// 	enemy.anchor.setTo(0.5, 1);
	// 	enemy.reset(game.width/2, 0);
	// 	//add gravity
	// 	enemy.body.gravity.y = 500;
	// 	enemy.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
		
	// 	enemy.body.bounce.x = 1;
	// 	enemy.checkWorldBounds = true;
	// 	enemy.outOfBoundsKill = true;
	// },

	// addEnemyFromBottom: function() {
	// 	var enemyb = this.enemies.getFirstDead();

	// 	if (!enemyb) {
	// 		return;
	// 	}

	// 	//initialize an enemy
	// 	enemyb.anchor.setTo(0.5, 1);
	// 	//add enemy from bottom
	// 	enemyb.reset(game.width/2,game.height);
	// 	//add gravity 
	// 	enemyb.body.gravity.y = -500;
	// 	enemyb.body.velocity.x = 100 * game.rnd.pick([-1, 1]);
	// 	enemyb.body.bounce.x = 1;
	// 	enemyb.checkWorldBounds = true;
	// 	enemyb.outOfBoundsKill = true;
	// },
createTimer: function(){
 
    var me = this;
 
    me.timeLabel = me.game.add.text(60, 60, "00:00", {font: "18px Arial", fill: "#ffffff"}); 
    me.timeLabel.anchor.setTo(0.5, 0);
    //me.timeLabel.align = 'center';
    this.timeLabel.fixedToCamera = true;
 
},
updateTimer: function(){
 
    var me = this;
 
    var currentTime = new Date();
    var timeDifference = me.startTime.getTime() - currentTime.getTime();
 
    //Time elapsed in seconds
    me.timeElapsed = Math.abs(timeDifference / 1000);
 
    //Time remaining in seconds
   // var timeRemaining = me.totalTime - me.timeElapsed; 

   var timeRemaining = me.timeElapsed;
 var minutes = Math.floor(me.timeElapsed / 60);
var seconds = Math.floor(me.timeElapsed) - (60 * minutes);
    //Convert seconds into minutes and seconds
    var minutes = Math.floor(timeRemaining / 60);
    var seconds = Math.floor(timeRemaining) - (60 * minutes);
 
    //Display minutes, add a 0 to the start if less than 10
    var result = (minutes < 10) ? "0" + minutes : minutes; 
 
    //Display seconds, add a 0 to the start if less than 10
    result += (seconds < 10) ? ":0" + seconds : ":" + seconds; 
 
    me.timeLabel.text = result;
 

 if(me.timeElapsed >= me.totalTime){
    //Do what you need to do
    game.state.start('play');
    this.music.stop();
}
},

//mobile controls
	addMobileInputs: function() {
		var jumpButton = game.add.sprite(350, 240, 'jumpButton');
		jumpButton.inputEnabled = true;
		jumpButton.alpha = 0.5;

		var leftButton = game.add.sprite(50, 240, 'leftButton');
		leftButton.inputEnabled = true;
		leftButton.fixedToCamera = true;
		 leftButton.alpha = 0.5;

		var rightButton = game.add.sprite(130, 240, 'rightButton');
		rightButton.inputEnabled = true;
		rightButton.fixedToCamera = true;
		rightButton.alpha = 0.5;

		jumpButton.events.onInputDown.add(this.jumpPlayer, this);
		jumpButton.fixedToCamera = true;

		this.moveLeft = false;
		this.moveRight = false;
//buttons
		leftButton.events.onInputOver.add(this.setLeftTrue, this); 
		leftButton.events.onInputOut.add(this.setLeftFalse, this); 
		leftButton.events.onInputDown.add(this.setLeftTrue, this); 
		leftButton.events.onInputUp.add(this.setLeftFalse, this);

		rightButton.events.onInputOver.add(this.setRightTrue, this); 
		rightButton.events.onInputOut.add(this.setRightFalse, this); 
		rightButton.events.onInputDown.add(this.setRightTrue, this); 
		rightButton.events.onInputUp.add(this.setRightFalse, this);

	},
 	
	jumpPlayer: function() { 
		if (this.player.body.touching.down) {  
			this.player.body.velocity.y = -320;
			this.jumpSound.play(); 
		} 
	},

	setLeftTrue: function() { this.moveLeft = true; },
	setLeftFalse: function() { this.moveLeft = false; },
	setRightTrue: function() { this.moveRight = true; },
	setRightFalse: function() { this.moveRight = false; },

	orientationChange: function() { 
		if (game.scale.isPortrait) { 
			game.paused = true; 
			this.rotateLabel.text = 'Please rotate your device '; 
		} 
		else { 
			game.paused = false; 
			this.rotateLabel.text = ''; 
		} 
	},


	
};