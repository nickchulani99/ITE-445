var game = new Phaser.Game(800,400,Phaser.AUTO, 'gameDiv');

game.global ={
	score:0
};


game.state.add('menu',menuState);
game.state.add('play',playState);


game.state.start('menu');