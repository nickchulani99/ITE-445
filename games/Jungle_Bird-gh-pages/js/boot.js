var bootState = {
    

    preload: function (){
    
    //Load the progressBar image
    game.load.image('progressBar', 'assets/progressBar.png');
    
    
    },
    
    create: function(){ 
    //Setting up some game setting
        game.stage.backgroundColor = '#3498db' ;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;    
    
    //Start the laod state 
        game.state.start('load');
    }
    
    
    //No update function 
}