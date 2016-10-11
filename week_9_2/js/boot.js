var bootState = {
	preload: function() {
		game.load.image('progressBar', 'assets/progressBar.png');
	},

	create: function() {
		game.stage.backgroundColor = "#3498db";
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.renderer.renderSession.roundPixels = true;
		

		//scaling

		if (!game.device.desktop) {

			// Set the type of scaling to 'show all'
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			// Set the min and max width/height of the game
			game.scale.setMinMax(game.width/2, game.height/2, game.width*2, game.height*2)
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
// Add a blue color to the page, to hide the white borders we might have
        
			document.body.style.backgroundColor = "#3498db";
		}

		game.state.start('load');
	},
}