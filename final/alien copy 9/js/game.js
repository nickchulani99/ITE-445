var game = new Phaser.Game(800,400,Phaser.AUTO, 'gameDiv');

game.global ={
	score:0
};
game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('control',controlState);
game.state.add('intro',introState);
game.state.add('intros',introsState);
game.state.add('intross',introssState);
// game.state.add('time',timeState);
game.state.add('video',videoState);
game.state.add('menu',menuState);


game.state.add('won',wonState);
game.state.add('play',playState);
game.state.add('level',levelState);
game.state.add('levels',levelsState);
game.state.add('home',homeState);


game.state.start('boot');