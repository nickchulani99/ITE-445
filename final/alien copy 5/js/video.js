var videoState={

    
    create: function(){

    var video;
    var sprite;
    
      video = game.add.video('storyvideo');
       video.play(false);
       sprite = video.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 2, 2);
//pause
        var picLabel= game.add.image(game.width/2, game.height-30, 'skip');
        picLabel.anchor.setTo(-1,1);
         picLabel.inputEnabled = true;
         picLabel.events.onInputDown.add(this.start, this);




         this.alienSound = game.add.audio('alien');
         this.alienSound.play();

//skip video
// var picLabel= game.add.image(game.width/2, game.height-30, 'skip');
//         picLabel.anchor.setTo(-2,1);
//          picLabel.inputEnabled = true;
//          picLabel.events.onInputDown.add(this.startgame, this);






       // game.time.events.add(Phaser.Timer.SECOND * 10, this.fadeState, this);

       // game.stage.backgroundColor= '#ffffff';

        game.physics.startSystem(Phaser.Physics. ARCADE);
        game.renderer.renderSession.roundPixels=true;
        
    },
         
         // fadeState: function(){
         //   game.state.start('play');

         // },
    start: function(){
 //game.paused = (game.paused) ? false : true;
         game.state.start('play');
         this.alienSound.stop();
            
        },
        //  startgame: function(){
        //     game.state.start('play');
            
        // },

};