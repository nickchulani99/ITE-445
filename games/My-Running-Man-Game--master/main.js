////////////Game made by Huanmeng Zhai/////////////////////////

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

var platforms;	
var player;	
var cursors;
var monsterGroup;	
var monster;
var stars;
var diamonds;
var score = 0;
var scoreText;
var button;
var mytime=0;
var total=0;

//start state called 'start'
var startState = {
	preload: function(){
		game.load.image('sky','assets/sky.png');
		//**************image too large change it
		game.load.image('startbutton','assets/startbutton.jpg');
	},
	create: function(){
		//add background
		game.add.sprite(0, 0, 'sky');
		//add game titile
		game.add.text(270,250,'Running Man',{font: '40px Normal'});
		//add start button
		game.add.button(game.world.centerX-130,310,'startbutton',clickStart);
		
		function clickStart(){
			game.state.start('main');
		}
		
	},
};







//mainstate called 'main'
var mainState = {
	
	
	preload:function(){
		game.load.image('sky','assets/sky.png');
		game.load.image('ground','assets/platform.png');
		game.load.image('star', 'assets/star.png');
		game.load.image('diamond','assets/diamond.png');
		game.load.spritesheet('dude','assets/dude.png',32,48);
		game.load.spritesheet('badguy','assets/baddie.png',32,32);
		game.load.audio('deadS',['assets/dead.mp3','assets/dead.ogg']);
		game.load.audio('coinS',['assets/coin.mp3','assets/coin.ogg']);
		game.load.audio('gamemusic','assets/gamemusic.wav');
		
	},


create: function () {
	//set world bounds
	//game.physics.setBoundsToWorld(true,false,false,true,false);
	game.world.setBounds(-50,0,1400,600);
	//start physics
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	//add background
	game.add.sprite(0, 0, 'sky');
	
	//releaseLedge();
	

	//add music
	deadSound = game.add.audio('deadS');
	coinMusic = game.add.audio('coinS');
	
	//game music
	music = game.add.audio('gamemusic',1,true);
	music.play('',0,1,true);
	
	//create a group
	platforms = game.add.group();
	platforms.enableBody = true;
	//platforms.physicsBodyType = Phaser.Physics.ARCADE;
	platforms.createMultiple(8,'ground');
	
	////////
	//platforms.setAll('body.velocity.x',-200);
	//platforms.setAll('body.immovable',true);
	//platforms.setAll('checkWorldBounds',true);
	//platforms.setAll('outOfBoundsKill',true);
	
	//first ledge show
	this.timer = game.time.events.add(0,addfirstledge);
	this.timer = game.time.events.add(1000,addSecondLedge);
	//loop the ledge

	//random a number for the timer
	//**********maybe i created a function and return the i value then it will work
	function randNumber(){
		i = Math.floor((Math.random() * (1+3000-1999)) + 1999);
		return i;
	}
	//***********need to change here so the ledge can appear in different time
	this.timer = this.game.time.events.loop(1600,addLS,this);
	//this.Startimer = this.game.time.events.loop(randNumber(),addstar,this);
	//this.Startimer.start();
	//add the first ledge
	function addfirstledge(){
		var ledge1 = platforms.getFirstDead();
		//var ledge2 = platforms.getFirstExists(false);
		ledge1.reset(200,game.world.height - 200);
		//ledge2.reset(600,game.world.height - 200);
		//200
		//add velocity to the ledge
		
		ledge1.body.velocity.x = -200;
		
		ledge1.body.immovable = true;
	
		//kill the ledge when it's no longer visible
		ledge1.checkWorldBounds = true;
		ledge1.outOfBoundsKill = true;
		
	}
	
	//add second ledge
	function addSecondLedge(){
		var ledge2 = platforms.getFirstDead();
		//var ledge2 = platforms.getFirstExists(false);
		ledge2.reset(600,game.world.height - 200);
		//ledge2.reset(600,game.world.height - 200);
		//200
		//add velocity to the ledge
		ledge2.body.velocity.x = -200;
		
		ledge2.body.immovable = true;
	
		//kill the ledge when it's no longer visible
		ledge2.checkWorldBounds = true;
		ledge2.outOfBoundsKill = true;
		
	}
		
	function addLedge(){
		var ledgeX = this.game.rnd.integerInRange(800,1400);
		var ledge = platforms.getFirstDead();
		//var ledge = platforms.create(200+x*48,y*50,'ground');
		ledge.reset(ledgeX,game.world.height - 200);
		//add velocity to the ledge
		ledge.body.velocity.x = -200;
		//ledge.body.position.x = -200;
	
		ledge.body.immovable = true;
	
		//kill the ledge when it's no longer visible
		ledge.checkWorldBounds = true;
		ledge.outOfBoundsKill = true;
		
	}
	
	
/*
	//tried another version
	function addLedge(){
		var ledge = platforms.getFirstDead();
	
		ledge.reset((Math.random()+800),game.world.height - 200);
		//add velocity to the ledge
		ledge.body.velocity.x = -200;
	
		ledge.body.immovable = true;
	
		//kill the ledge when it's no longer visible
		ledge.checkWorldBounds = true;
		ledge.outOfBoundsKill = true;
	
	}

	
	*/
	//player add(height - 250 will be one the ledge)
	player = game.add.sprite(32,game.world.height - 400,'dude');
	
	//enable physics on player
	game.physics.arcade.enable(player);
	
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 500;
	//player.body.collideWorldBounds = true;
	
	//left and right image
	player.animations.add('left',[0,1,2,3],10,true);
	player.animations.add('right',[5,6,7,8],10,true);
	
	
	//add monster 
	//monsterGroup = game.add.sprite(32,)
	monsterGroup = game.add.group();
	monsterGroup.enableBody = true;
	monsterGroup.createMultiple(10,'badguy');
	
	//adding the stars
	stars = game.add.group();
	stars.enableBody = true;
	
	function addstar(){
		var starNum = this.game.rnd.integerInRange(2,8);
		var starX = this.game.rnd.integerInRange(800,1400);
		var starY = this.game.rnd.integerInRange(game.world.height - 220,game.world.height - 350);
		for(var i = 1;i < starNum; i++){
			//var star = stars.create(i*50+650,game.world.height - 220,'star');
			var star = stars.create(i*50+starX,starY,'star');
			star.body.velocity.x = -200;
			star.body.immoveable = true;
			star.checkWorldBounds = true;
			star.outOfBoundsKill = true;
			
		}
		
	}
	
	//diamond group
	diamonds =  game.add.group();
	diamonds.enableBody = true;
	diamonds.createMultiple(5,'diamond');
	
	function addLS(){
		addLedge();
		//releaseLedge();
		addstar();
		pickOne();
		
		}
	
	//this is function to deciced 1-5 monster,6-8 nothing,9-10 items
	function pickOne(){
		gamenumber = this.game.rnd.integerInRange(1,10);
		//monster come owow
		//alert(gamenumber);
		if(gamenumber == 1,2,3){
			var monsterX = this.game.rnd.integerInRange(800,1400);
			monster = monsterGroup.getFirstDead();
			monster.reset(monsterX,game.world.height - 300);
	
		
		//player.body.collideWorldBounds = true;
	
		//left and right image
		monster.body.bounce.y = 0.2;
		monster.body.gravity.y = 500;
		monster.animations.add('left',[0,1],10,true);
		monster.body.velocity.x = -50;
		monster.animations.play('left');
		monster.body.immoveable = true;
		monster.checkWorldBounds = true;
		monster.outOfBoundsKill = true;
		}
		//item
		if(gamenumber == 9){
			var diamondX = this.game.rnd.integerInRange(800,1400);
			diamond = diamonds.getFirstDead();
			diamond.reset(diamondX,game.world.height - 300)
			game.physics.arcade.enable(diamond);
			diamond.body.gravity.y= 500;
			diamond.checkWorldBounds = true;
			diamond.outOfBoundsKill = true;
		}
	
	}
	
	
	//  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	
	cursors = game.input.keyboard.createCursorKeys();
	
},

update:function() {

	// If the bird is out of the world (too high or too low), call the 'restartGame' function
	if (player.inWorld == false){
     	deadSound.play();
		music.stop();
		game.state.start("end");
		
	}
	
	/*
	if(total< 200&& game.time.now>mytime){
		releaseLedge();
	}
	*/
	
	//keep player on the ledge
	//game.physics.arcade.collide(player,platforms);
	game.physics.arcade.collide(player,platforms);
	game.physics.arcade.collide(stars,platforms);
	game.physics.arcade.overlap(player,stars,collectStar,null,this);
	//monster physic
	game.physics.arcade.collide(monsterGroup,platforms);
	//game.physics.arcade.collide(monsterGroup,platforms,monsterFall,null,this);
	game.physics.arcade.collide(player,monsterGroup,killplayer,null,this);
	
	//diamond
	game.physics.arcade.collide(diamonds,platforms);
	game.physics.arcade.overlap(player,diamonds,diamondCollect);
	//player x velocity
	player.body.velocity.x = 0;
	
	
	
	if(cursors.left.isDown){
		
		//move to the left
		player.body.velocity.x=-150;
		player.animations.play('left');
	}
	
	if(cursors.right.isDown){
		
		//move to the right
		player.body.velocity.x = 200;
		player.animations.play('right');
	}
	
	//jump if on the ground
	if(cursors.up.isDown && player.body.touching.down){
	
		player.body.velocity.y = -400;
	}
	
	if(score > 1000){
		platforms.setAll('body.velocity.x',-300);
		//alert(1)
	
	}
	
	if(score > 2000){
		platforms.setAll('body.velocity.x',-400);
	}
	
	
	//when player and coins overlap,call this
	function collectStar (player, star) {
    	
		//play coin music
		coinMusic.play();
    	// Removes the star from the screen
		star.kill();

		//  Add and update the score
    	score += 10;
		scoreText.text = 'Score: ' + score;

		}
	/*
	function checkCol(monster,platforms){
		
		if(game.physics.arcade.collide(monster,platforms)==false){
			
			monster.body.velocity.x=0;
		}
	
	}*/
	
	function killplayer(player,monster){
		//alert(monster.body.touching.up);
		if(monster.body.touching.up){
			monster.kill();
			score += 25;
			scoreText.text = 'Score: ' + score;
		}
		else{
		deadSound.play();
		music.stop();
		game.state.start("end")
		}
	
	}
	/*
	function monsterFall(monsterGroup,platforms){
		alert(monster.isTouchingGround())
		if(monster.isTouchingGround()){
			//alert(monster.body.touching.down);
			monster.body.velocity.x=0;
			monster.body.collideWorldBounds = false;
			monster.animations.stop('left')
		}
		
		
	}
	*/
	function diamondCollect(player,diamonds){
		//play music
		coinMusic.play();
		//remove diamond
		diamonds.kill();
		//add score
		score += 100;
		scoreText.text = 'Score: ' + score;
	}

	
	},
};


/*
function releaseLedge(){
	//random altitude
	//var altitude = game.rnd.integerInRange(0,game.world.bounds);
	ledge = game.add.sprite((Math.random()*800),400,'star');
		//ledge.body.velocity.x = -200;
	tweenLedge = game.add.tween(ledge);
	tweenLedge.to({ x:game.width-(1600 + ledge.x)},20000,Phaser.Easing.Linear.None,true);
	tweenLedge.start();
	total++;
	mytime= game.time.now+100;
}

*/
//gameover state called 'end'
var endState ={
	preload: function(){
	game.load.image('sky','assets/sky.png');
	//*********image too large need to small it find how
	game.load.image('retry','assets/retry.png');
	game.load.audio('deadM','assets/deadmusic.wav');
	},
	create: function(){
	//add background
	game.add.sprite(0, 0, 'sky');
	//add retry button
	button=game.add.button(300,310,'retry',clickAction);
	//show game over
	game.add.text(230,250,'Game Over',{font: '70px Normal'});
	//show the score you get
	game.add.text(250, 300, scoreText.text, { font: '60px Arial'});
	
	//add sound
	deadMusic = game.add.audio('deadM');
	deadMusic.play();	
	function clickAction (){
		score = 0
		deadMusic.stop();
		game.state.start('main');
		}
	}

};

game.state.add('start',startState);
game.state.add('main',mainState);
game.state.add('end',endState);
game.state.start('start');
