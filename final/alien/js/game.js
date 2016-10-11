var game = new Phaser.Game(800,400,Phaser.AUTO, 'gameDiv');

game.global ={
	score:0
};
game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('video',videoState);
game.state.add('intro',introState);
game.state.add('play',playState);
game.state.add('level',levelState);
game.state.add('home',homeState);


game.state.start('boot');