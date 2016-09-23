var menuState = {
	create: function (){
		game.add.image(0,0,'background');
this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);

	var nameLabel = game.add.text(game.world.centerX, -50, 'Super Coin Box', { font: '70px Geo', fill: '#ffffff' });
	nameLabel.anchor.setTo(0.5,0.5);
	game.add.tween(nameLabel).to({y:80},1000).easing(Phaser.Easing.Bounce.Out).start();
	game.add.tween(nameLabel).to({y:80},1000).start();
	var scoreLabel = game.add.text(game.width/2, game.height/2,
		'score:'+game.global.score,
		{font:'25px Arial',fill:'#ffffff'});
	scoreLabel.anchor.setTo(0.5,0.5);
	var startLabel = game.add.text(game.width/2, game.height -80,
		'press the up arrow key to start', {
			font:'25px Arial',fill:'#ffffff'
		});
	startLabel.anchor.setTo(0.5,0.5);
	game.add.tween(startLabel).to({angle: -2},500).to({angle:2},1000).to({angle:0},500).loop().start();
	//create new phaser keyboard varaible
	//when press call start
	var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	upKey.onDown.add(this.start,this);

	// If 'bestScore' is not defined
// It means that this is the first time the game is played 
if (!localStorage.getItem('bestScore')) {
          // Then set the best score to 0
          localStorage.setItem('bestScore', 0);
      }
      // If the score is higher than the best score
if (game.global.score > localStorage.getItem('bestScore')) { 
// Then update the best score 
localStorage.setItem('bestScore', game.global.score);
}


var text = 'score: ' + game.global.score + '\nbest score: ' + localStorage.getItem('bestScore');
var scoreLabel = game.add.text(game.width/2, game.height/2, text, { font: '25px Arial', fill: '#ffffff', align: 'center' });
scoreLabel.anchor.setTo(0.5, 0.5);

	},

toggleSound: function(){
     game.sound.mute = !game.sound.mute;
      this.muteButton.frame = game.sound.mute ? 1: 0;
    
	},






	start:function(){
			//start the game 
		game.state.start('play');
	}
}