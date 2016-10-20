var menuState = {
    
    create: function(){
        game.add.image(0,0 , 'menuWall');
        
        var nameLabel = game.add.text(game.width/2, -100, 'Jungle Bird', {font: '40px Arial', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);
        
        game.add.tween(nameLabel).to({y: 80}, 1500).easing(Phaser.Easing.Bounce.Out).start();
        
        
        //Add Frenzy and wave motion
        var frenzyLable = game.add.text(game.width/2, game.height-500, 'FRENZY', {font: '30px Arial', fill: '#ffffff' });
        
        frenzyLable.anchor.setTo(0.5, 0.5);
        
        game.add.tween(frenzyLable).to({angle: -2}, 500).to({angle: 2 }, 1000 ).to({angle:0}, 500).loop().start();
        
        
        
        //Letting game start
        var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        leftKey.onDown.add(this.start, this);
        
        var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        rightKey.onDown.add(this.start, this);
        
        
    },
    
    start: function() {
        game.state.start('play');
    }
        
}