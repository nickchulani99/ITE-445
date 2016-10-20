var videoState={




create: function(){
    var video;
    var sprite;
    
     video = game.add.video('video');
        video.play(true);

 sprite = video.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 2, 2);

        var picLabel= game.add.image(game.width/2, game.height-30, 'skip');
        picLabel.anchor.setTo(-1,1);
         picLabel.inputEnabled = true;
         picLabel.events.onInputDown.add(this.videos, this);

        //game.time.events.add(Phaser.Timer.SECOND * 10, this.fadeState, this);

       // game.stage.backgroundColor= '#ffffff';

        game.physics.startSystem(Phaser.Physics. ARCADE);
        game.renderer.renderSession.roundPixels=true;
        
    },
         
          
       start: function(){
        game.state.start('play');
    },

    stop: function(){
        //this.video.stop();
    game.video.paused=true;
    
    game.time.events.add(1000,this.startMenu,this);
   

    },






























// create:function() {
//     var video;
// var sprite;


//    // game.stage.backgroundColor = '#232323';

//     video = game.add.video('video');

//     //  See the docs for the full parameters
//     //  But it goes x, y, anchor x, anchor y, scale x, scale y
//     sprite = video.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 2, 2);

//     //  true = loop
//     video.play(true);

//     game.input.onDown.add(this.pause, this);

// },

// pause:function () {
// video.play(false)

// },

// // render:function () {

// //     game.debug.text("Video Time: " + video.currentTime, 32, 20);
// //     game.debug.text("Video Duration: " + video.duration, 550, 20);

// //     game.debug.text("Video Progress: " + Math.round(video.progress * 100) + "%", 32, 590);
// //     game.debug.text("Video Playing: " + video.playing, 550, 590);

// // },
};
