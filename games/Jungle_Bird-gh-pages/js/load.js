var loadState = {
    preload: function() {

    //Loading Bar...
    var loadingLable = game.add.text(game.width/2, 150 , 'loading..', {font: '30px Arial', fill: '#ffffff' });

    loadingLable.anchor.setTo(0.5, 0.5 );

    var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
    progressBar.anchor.setTo(0.5,0.5);
    game.load.setPreloadSprite(progressBar);



    game.load.image('skyfield1', 'assets/background.png');
    game.load.image('skyfield2', 'assets/wall2.jpg');
    game.load.image('skyfield3', 'assets/wall3.png');
    game.load.image('skyfield4', 'assets/wall4.jpg');
    game.load.spritesheet('player', 'assets/player2.png', 40 ,40 );
    game.load.image('ground', 'assets/wallHorizontal.png');
    game.load.image('wall', 'assets/wallVertical.png');
    game.load.spritesheet('alphabet', 'assets/alphabet.png', 30,30);

    game.load.audio('bgSong', [ 'assets/music.mp3']);
    game.load.audio('dieSound', ['assets/die.wav']);
    game.load.audio('coinSound', ['assets/coin.wav']);
    game.load.audio('jumpSound', ['assets/jump.wav']);


    //Tile MAP resource
    
    game.load.image('terrain', 'Tile_resource/terrain.png');
    game.load.image('objects', 'Tile_resource/objects.png');

    game.load.tilemap('mapTile1', 'assets/mapTile_1.json', null,
    Phaser.Tilemap.TILED_JSON);



    },

    create: function() {
        game.state.start('menu');
    }
}
