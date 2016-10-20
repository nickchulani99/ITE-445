var introState={

	
	create: function(){
	
	
	   game.add.image(0,0, 'intro');
	var nameLabel = game.add.text(game.world.centerX, -50, 'Select Level', { font: '70px Geo', fill: '#e0eb0f' });
	nameLabel.anchor.setTo(0.5,0.5);   
	game.add.tween(nameLabel).to({y:80},1000).easing(Phaser.Easing.Bounce.Out).start();

		var picLabel= game.add.image(game.width/2, game.height-30, 'levelone');
		picLabel.anchor.setTo(2.1,2);
		 picLabel.inputEnabled = true;
		 picLabel.events.onInputDown.add(this.start, this);




		 var picLabel2= game.add.image(game.width/2, game.height-30, 'leveltwo');
		picLabel2.anchor.setTo(0.5,2);
		 // picLabel2.inputEnabled = true;
		 picLabel2.events.onInputDown.add(this.starttwo, this);






 var picLabel2= game.add.image(game.width/2, game.height-30, 'levelthree');
		picLabel2.anchor.setTo(-1.2,2);
		 // picLabel2.inputEnabled = true;
		 picLabel2.events.onInputDown.add(this.startthree, this);




 var picLabel2= game.add.image(game.width/2, game.height-30, 'how');
		picLabel2.anchor.setTo(-1,1);
		 picLabel2.inputEnabled = true;
		 picLabel2.events.onInputDown.add(this.startfour, this);

		//game.time.events.add(Phaser.Timer.SECOND * 10, this.fadeState, this);

		game.stage.backgroundColor= '#ffffff';

		game.physics.startSystem(Phaser.Physics. ARCADE);
		game.renderer.renderSession.roundPixels=true;
		
	},
         
         // fadeState: function(){
         //   game.state.start('play');

         // },
	start: function(){
			
			game.state.start('play');
		},
		starttwo: function(){
			
			game.state.start('intros');
		},
		startthree: function(){
			
			game.state.start('intross');
		},
		startfour: function(){
			
			game.state.start('control');
		},

};