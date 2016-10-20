
// create the game
var game = new Phaser.Game( 800, 600,
                           Phaser.CANVAS, '',
                            { preload: preload,
                              create: create,
                              update: update } );

var gameMode = 1; // 0 = start screen, 1 = game, 2 = fail screen, 3 = win screen
var currentLevel = 0;
var levelText;
var levels = ['cata', 'cata2'];
var score = 0;
var scoreText;
var mood = 0;
var moodText;
var lives = 3;
var livesText;
var INITIAL_JUMP_VELOCITY = 350;
var jumpVelocity = INITIAL_JUMP_VELOCITY;
var walkVelocity = 150;
var JUMP_OFFSET = 0.1 // offset hack to ensure jumps are still possible;

var skies = {lights:[], darks:[]};

var groundObjects = [];
var ledgeObjects = [];
var ledgeSizes = [];
var ledgeXs = [];
var ledgeYs = [];
var ledgeStart = 30;
var ledgeEnd = 75;
var backgroundInd = 0;
var END_TILE = 15;
var isOnLedge = false;
var playerLedge

var hudGroup;
var playerStartPosition = {x:64, y:300};
var playerEndPosition = {x:3052, y:480};
var minMood = -20;
var levelWidth = 10000;
var levelHeight = 3000;


var playerPosUpdated = true;
var moodHit = false;
var moodModifiers = [{x:100,y:300},
                     {x: 1193,y:175},
                     {x: 1230,y:512}];

var texts = [{ message: "I'm breaking up with you.", good: false},
             { message: "Your dog is dead.", good: false},
             { message: "Your house burned down.", good: false},
             { message: "Someone keyed your car.", good: false},
             { message: "Your game got 32 on metacritic.", good: false},
             
             { message: "You are beautiful.", good: true },
             { message: "You've won the lottery", good: true },
             { message: "Climate change: Not happening after all.", good: true }];

//------------------------------------------------------------------------------
function preload() {
  game.load.image('start', 'assets/start.png');
  game.load.image('end_fail', 'assets/end.png');
  game.load.image('end_win', 'assets/end_win.png');

  game.load.image('sky', 'assets/sky.png');
  game.load.image('sky_dark', 'assets/sky_dark.png');
  game.load.image('ground', 'assets/lava2_001.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('ledge','assets/platform.png', 16, 16);

  game.load.tilemap('cata','assets/levelDesign.csv', null, Phaser.Tilemap.CSV);
  game.load.tilemap('cata2','assets/levelDesign2.csv', null, Phaser.Tilemap.CSV);
  game.load.tileset('cataTiles','assets/MoodJumperTileSet.png', 16, 16);

  game.load.image('endLevel', 'assets/endLevel.png');
  game.load.image('moodModifier', 'assets/moodModifier.png' );

  game.load.image('phone', 'assets/phone-icon-lo.png');

  // audio
  game.load.audio('pickup', 'audio/p-ping.mp3');
  game.load.audio('death', 'audio/player_death.wav');
  game.load.audio('jump', 'audio/shotgun.wav');

}

//------------------------------------------------------------------------------
function create() {
  switch( gameMode ){
  case 0:
    createStartScreen();
    break;
  case 1:
    createGame();
    break;
  case 2:
    break;
  case 3:
    break;
  default:
    console.error( "unknown game mode", gameMode );
  }
}

//------------------------------------------------------------------------------
function createStartScreen(){
  console.log( "create Start screen" );

  startSprite = game.add.sprite(0, 0, 'start');
  
  enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
}

//------------------------------------------------------------------------------
function createFailScreen(){
  console.log( "create fail screen" );
  
  levelText.content = "";
  scoreText.content = "";
  moodText.content = "";
  livesText.content = "";

  endSprite = game.add.sprite(0, 0, 'end_fail');
  
  enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
}

//------------------------------------------------------------------------------
function createWinScreen(){
  console.log( "create win screen" );
  
  levelText.content = "";
  scoreText.content = "";
  moodText.content = "";
  livesText.content = "";

  endSprite = game.add.sprite(0, 0, 'end_win');
  
  enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
}

//------------------------------------------------------------------------------
function update(){
  switch( gameMode ){
  case 0:
    updateStartScreen();
    break;
  case 1:
    updateGame();
    break;
  case 2:
    updateFailScreen();
    break;
  case 3:
    updateWinScreen();
    break;
  default:
    console.error( "unknown game mode", gameMode );
  }
}

//------------------------------------------------------------------------------
function updateStartScreen(){
  // switch to the game once enter is pressed
  if (enterKey.isDown){
    createGame();
    gameMode = 1;
  }
}

//------------------------------------------------------------------------------
function updateFailScreen(){
  // go back to start screen when the enter key is pressed
  if (enterKey.isDown){
    createStartScreen();
    gameMode = 0;
  }
}

//------------------------------------------------------------------------------
function updateWinScreen(){
  // go back to start screen when the enter key is pressed
  if (enterKey.isDown){
    createStartScreen();
    gameMode = 0;
  }
}

//------------------------------------------------------------------------------
function createGame() {
  // create a long stage
 // map = game.add.tilemap('mario');
 //tileset = game.add.tileset('marioTiles');
  game.world.setBounds(0, 0, levelWidth,levelHeight);

 // game.world.setBounds(0, 0, levelWidth, 600);

  
  // a simple background for our game
  createSky();
  
  // load the tileset and tilemap
  map = game.add.tilemap(levels[currentLevel]);
  tileset = game.add.tileset('cataTiles');

  levelHeight = getLevelHeight(map.layers[0].data,0,tileset.tileHeight);
  console.log("calculated level height: ",levelHeight);
  
  // the platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();
  
  // create the groud objects
  createGround();
  
  // dynamically generate the level geometry using the tilemap
  iterateTiles(map.layers[0].data,0,0,tileset.tileWidth,tileset.tileHeight);
  //console.log("data size ",map.layers[0].data.length);
  changeLedgeTilesToBackground(map);
  
  // create some moodModifier objects
  moodModifiersGroup = game.add.group();
  for ( var i = 0 ; i < moodModifiers.length ; i++ ){
    moodModifiers[i].object = moodModifiersGroup.create( moodModifiers[i].x,
                                                         moodModifiers[i].y,
                                                         'moodModifier' );
    
  }

  // create end of level object
  endLevel = game.add.sprite(playerEndPosition.x,
                             playerEndPosition.y,
                             'endLevel');
  
  // create the stars
  stars = game.add.group();
  createStars();
  
  // create a player
  player = game.add.sprite(playerStartPosition.x,
                           playerStartPosition.y,
                           'dude');
  
  // player physics properties
  player.body.gravity.y = 7;
  player.body.collideWorldBounds = true;
  
  // two animations, walking left and right.
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);
  //console.log("playerOnFirstLedge?",playerIsOn(ledgeObjects,0)); 
  // have the camera follow the player
  game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);

  // create cursor controls
  cursors = game.input.keyboard.createCursorKeys();
  
  // use A and Z to manually adjust mood
  aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
  zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
  kKey = game.input.keyboard.addKey(Phaser.Keyboard.K);
  kKey.onDown.add( killPlayer );
  dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
  dKey.onDown.add( addDialog );
  fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
  fKey.onDown.add( goFullScreen );
  nKey = game.input.keyboard.addKey(Phaser.Keyboard.N);
  mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);

  // create the level text
  levelText = game.add.text(16, 16, 'Level: ' + (currentLevel + 1),
                            { font: '32px arial', fill: '#FFF' });

  // create the score text
  scoreText = game.add.text( 200, 16, 'Score: ' + score,
                            { font: '32px arial', fill: '#FFF' });
   
  // create the mood text
  moodText = game.add.text( 400, 16, 'Mood: ' + displayMood(),
                            { font: '32px arial', fill: '#FFF' });

  // reset lives
  lives = 3;

  // create the lives text
  livesText = game.add.text( 600, 16, 'Lives: ' + lives,
                             { font: '32px arial', fill: '#FFF' });

  // create the hud
  hudGroup = new Phaser.Group(game, null, 'hud', true);

  // add text objects to hud group
  hudGroup.add( levelText );
  hudGroup.add( scoreText );
  hudGroup.add( moodText );
  hudGroup.add( livesText );

  // add some sounds
  pickupSound = game.add.audio('pickup');
  deathSound = game.add.audio('death');
  jumpSound = game.add.audio('jump');
}
//------------------------------------------------------------------------------
// destroy all the game objects that will be safely recreated for the next level
function cleanupGame(){
  console.log( "cleanupGame()" );

  // cleanup HUD elements
  levelText.destroy();
  scoreText.destroy();
  moodText.destroy();
  livesText.destroy();

  // TODO: cleanup sounds
}

//------------------------------------------------------------------------------
// reset mood related game settings 
function resetGame(){
  setMood(0);
  scaleLedges(ledgeObjects,mood);
  scaleVerticalLedgePos(ledgeObjects,mood);
  player.x = playerStartPosition.x;
  player.y = playerStartPosition.y;

  // destroy and recreate the stars
  stars.destroy();
  stars = game.add.group();
  createStars();
}

//------------------------------------------------------------------------------
function changeLedgeTilesToBackground(map){
   for (i = ledgeStart; i <=ledgeEnd;i++){
      map.swap(backgroundInd, i);
   }
}
//------------------------------------------------------------------------------
//create ledges
function createLedge(x,y,size){
   var n = ledgeObjects.length;
   ledgeObjects[n] = platforms.create(x, y, 'ledge');
   //console.log("scale ledge by", size);
   ledgeObjects[n].scale.x = size;
   ledgeSizes[n] = size;
   ledgeXs[n] = x;
   ledgeYs[n] = y;
  // console.log("ledge scale is",ledgeObjects[n].scale.x);
   ledgeObjects[n].body.immovable = true;
  // console.log("ledge",n,"x",x,"y",y,"width",ledgeObjects[n].width,"height",ledgeObjects[n].height);
}
//------------------------------------------------------------------------------
function updatePlayerEndPos(x,y){
 // console.log("Player end pos updated to: ",x,y);
  playerEndPosition = {x:x, y:y};

  // debug
  //playerEndPosition = {x:400, y:400};
}
//------------------------------------------------------------------------------
function isLedge(tileVal){
  if (tileVal >= ledgeStart && tileVal <= ledgeEnd)
     return true;
  return false;
}
//------------------------------------------------------------------------------
function isEnd(tileVal){
   if (tileVal == END_TILE) return true;
   return false;
}
//------------------------------------------------------------------------------
function getLevelHeight(dataMatrix,startY,tileYSize){
   //console.log("numYs",dataMatrix.length,"start",startY," tileYSize",tileYSize);
   return dataMatrix.length*tileYSize+startY;
}
function iterateTiles(dataMatrix,startX,startY,tileXSize,tileYSize){
  var ledgeStarted = false;
      var startCol = 0;
      var startRow = 0;
      var n = 0;
      for (i=0;i<dataMatrix.length;i++){
         row = getPos(startY,tileYSize,i);
         for (j=0;j<dataMatrix[0].length;j++){
            col = getPos(startX,tileXSize,j);
            if (isLedge(dataMatrix[i][j])){
               //createLedge(col,row,tileXSize,tileYSize);
               if (!ledgeStarted){
                  ledgeStarted = true;
                  startCol = col;
                  startRow = row;
                  n = 1;
               }else n++;
            }else if (ledgeStarted){
               ledgeStarted = false;
               createLedge(startCol,startRow,n);
            }if (isEnd(dataMatrix[i][j])){
               updatePlayerEndPos(col,row);
            }
         }
      }//console.log("player start position",playerStartPosition.x,playerStartPosition.y);
}

function getPos(layerStart,tileSize,ind){
  return layerStart + tileSize * ind;
}

//------------------------------------------------------------------------------
// create enough sky objects to span the entire level
function createSky(){
  var numSkies = Math.ceil(game.world.width / 800);
  //console.log( "num skies = ", numSkies );

  for ( var i = 0 ; i < numSkies ; i++ ){
    var sky_light = game.add.sprite(i * 800, 0, 'sky');
    var sky_dark  = game.add.sprite(i * 800, 0, 'sky_dark');
    //sky_light.scale.y = levelHeight/600;
    //sky_dark.scale.y = levelHeight/600;
    sky_dark.alpha = 0;

    skies.lights.push(sky_light);
    skies.darks.push(sky_dark);
  }
}

//------------------------------------------------------------------------------
function setSkyAlpha( alpha ){
  //console.log( "setSkyAlpha(", alpha, ")" );

  // clamp alpha between 0 and 1
  alpha = Math.max( Math.min( alpha, 1 ), 0 );

  //console.log( "clamp to", alpha );

  for (var i = 0 ; i < skies.lights.length ; i++){
    skies.lights[i].alpha = 1 - alpha;
    skies.darks[i].alpha = alpha;
  }
}

//------------------------------------------------------------------------------
// create enough ground objects to span the entire level
function createGround(){
  var numGrounds = Math.ceil(game.world.width / 256);
  //console.log( "num ground objects = ", numGrounds );

  for ( var i = 0 ; i < numGrounds ; i++ ){
    // create a ground object
    var ground = platforms.create(i * 256, levelHeight - 24, 'ground');
  
    // double the size so that it is wide enough to fill the whole screen
    ground.scale.setTo(2, 2);
    
    // this stops it from falling away when you jump on it
    ground.body.immovable = true;
    ground.body.allowCollision.up = false;

    // add this object to a global list of objects
    groundObjects.push( ground );
  }
}

//------------------------------------------------------------------------------
function createStars(){
  var numStars = Math.ceil(game.world.width / 80);
  //console.log( "num stars = ", numStars );

  for (var i = 0; i < numStars; i++) {
    // create a star inside of the 'stars' group
    var star = stars.create(i * 80, 0, 'star');
    
    // add gravity
    star.body.gravity.y = 6;
    
    // make the star bounce slightly
    star.body.bounce.y = 0.2 + Math.random() * 0.2;
  }
}

//---------------------------------------------------	-----------------------
function updateGame() {
  //  Collide the player and the stars with the platforms
  //game.physics.collide(player,layer);
  game.physics.collide(player, platforms);
  game.physics.collide(stars, platforms);
	//game.physics.collide(stars,layer);

  // if player has fallen to bottom of screen, kill player
  if (player.y >= (levelHeight-50)){
    killPlayer();
  }

  if (player.body.wasTouching.down){
     //console.log("update player ledge");
     findPlayerLedge();
  }
  scaleLedges(ledgeObjects,mood);
  scaleVerticalLedgePos(ledgeObjects,mood);
  
  //  Reset the players velocity (movement)
  player.body.velocity.x = 0;
  
  if (cursors.left.isDown) {
    //  Move to the left
    player.body.velocity.x = -walkVelocity;
    
    player.animations.play('left');
  } else if (cursors.right.isDown) {
    //  Move to the right
    player.body.velocity.x = walkVelocity;
    
    player.animations.play('right');
  } else {
    //  Stand still
    player.animations.stop();

    player.frame = 4;
  }
  
  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -jumpVelocity;
    jumpSound.play();
  }
  
  if (player.body.wasTouching.up){
      modifyMood( -1 );
  }

  // manually modify the player mood using A and Z
  if (aKey.isDown){
    modifyMood( -1 );
  }
  if (zKey.isDown){
    modifyMood( 1 );
  }
  
  // manually modify the player jump velocity
  if (nKey.isDown){
    modifyJumpVelocity( -5 );
  }
  if (mKey.isDown){
    modifyJumpVelocity( 5 );
  }

  // check for ovelap between player and stars
  game.physics.overlap(player, stars, collectStar, null, this);

  // check for overlap between player and endLevel marker
  game.physics.overlap(player, endLevel, playerEndLevel, null, this);

  // check for overlap between player and endLevel marker
  game.physics.overlap(player, moodModifiersGroup, moodModifierCollide, null, this);
}
//------------------------------------------------------------------------------
function findPlayerLedge(){
   for (i=0;i<ledgeObjects.length;i++){
      if (playerIsOn(ledgeObjects,i)){
         //console.log("found player ledge",i);
         playerLedge = ledgeObjects[i];
         isOnLedge = true;
      }
   }
}
//------------------------------------------------------------------------------
function endVisible(ledge){
   var p = ledge.topRight;
   if (visible(p.x)) return true;
   return false;
}
//------------------------------------------------------------------------------
function visible(x){
  if (x <= game.camera.x + game.camera.width) return true;
  return false;
}
//------------------------------------------------------------------------------
function scaleLedges(ledges, mood){
   
   for ( var i = 0 ; i < ledges.length ; i++ ){
     ledges[i].scale.x = scaleVar(mood,ledgeSizes[i]);//(1 + mood/((-1)*minMood)) * ledgeSizes[i];
   }
   
}
function scaleVerticalLedgePos(ledges,mood){
   if (!player.body.wasTouching.down) isOnLedge = false;
  for (var i = 0; i < ledges.length; i++){
    /* if (ledges[i].body.touching.up){
        if (playerIsOn(ledges,i)){
         isOnLedge = true;
         playerLedge = ledges[i];
         //console.log("updated player ledge to ",ledges[i].y);
        }
    }*/
    if (mood == 0) ledges[i].y = ledgeYs[i];
    else {
       toScale = (levelHeight-ledgeYs[i]);
       scaled = scaleVar(-mood,toScale);
       newVal = levelHeight - scaled;
       ledges[i].y = newVal;
       //if (i==1) console.log("origVal",ledgeYs[i],"toScale",toScale,"scaled",scaled,"newLedgeStart ",newVal);
    }
  }updatePlayerPosition();
}

function playerIsOn(ledges,ledgeIndex){
   le = ledges[ledgeIndex];
 /*  if (ledgeIndex == 21) {
      console.log("player x",player.x,"player y",player.y,"width",player.width,"height",player.height);
      
      console.log("ledge x",le.x,"ledge y",le.y,"width",le.width,"height",le.height);
   }*/
   
   if (inRange(player.x,player.x+player.width,le.x,le.x+le.width)){
      if (inRange(player.y,player.y+player.height,le.y,le.y+le.height)){
         //console.log("player in y range");
         return true;
      }
    }return false;
 /*  if (Math.abs(ledges[ledgeIndex].y-player.y) < player.height){
      xMax = ledges[ledgeIndex].x;
      xMin = ledges[ledgeIndex].width;
     // console.log("ledgeXMin",xMin,"ledgeXMax",xMax);
      if (player.x-5 >= xMin && player.x <= xMax+5) return true;
   } return false;*/
}

function inRange(px1,px2,lx1,lx2){
   if ((px1 >= lx1 && px1 <= lx2) ||
       (px2 >= lx1 && px2 <= lx2)) return true;
   return false;
}

function updatePlayerPosition(){
   //console.log("is on ledge "+isOnLedge);
   if (isOnLedge && !playerPosUpdated) {
      player.y = playerLedge.y - 80;
      playerPosUpdated = true;
      //console.log("update player position");
   }
}

/*function scalePlayerPos(player,mood){
   origY = player.y;
   toScale = (levelHeight-origY);
   scaled = scaleVar(-mood/2,toScale);
   newVal = levelHeight - scaled;
   player.y = newVal;
   console.log("body y",player.body.y);
   console.log("playerPos",origY,"toScale",toScale,"scaled",scaled,"newPlayerPos ",newVal);
   playerPosUpdated = true;
}*/
function getNewY(scale,origY){
   if (scale != 1){
   diff = scale-origY;
   return (origY-diff);
   //console.log("scale",scale,"orig",origY,"change to",(origY-diff));
   }
}

/* returns the current scale multiplier*/
function scaleMultiplier(tempMood)
{
	return (1 + (tempMood/((-1)*minMood)));
}

// changed to use scaleMultiplier(mood) 
function scaleVar(tempMood,origVal){
	return (scaleMultiplier(tempMood) * origVal);
   //return  (1 + mood/((-1)*minMood)) * origVal;
}
//------------------------------------------------------------------------------
function render(){
  // game.debug.renderCameraInfo(game.camera, 10, 10);
  return;

  //console.log( "render", game.camera.x );
  //game.debug.renderCameraInfo(game.camera, 32, 32, 'rgb(255,255,255)' );
};

//------------------------------------------------------------------------------
function collectStar (player, star) {
  // Removes the star from the screen
  star.kill();

  // play pickup sound
  pickupSound.play();

  score += 10;
  scoreText.content = 'Score: ' + score;

  // add one to the mood
  modifyMood( 1 );
}

//------------------------------------------------------------------------------
function modifyMood( modifier ){
  playerPosUpdated = false; 
  setMood(mood + modifier);
  //console.log("mood modified update player position");
  /*moodText.content = 'Mood: ' + mood; 
  setSkyAlpha( mood / minMood );
  if (mood <= minMood) killPlayer();*/
}

function displayMood()
{
	var emoticon;
	if (mood < -7)
	{
		emoticon = "T_T";	
	} 
	else if (mood < -3)
	{
		emoticon = ":'(";	
	} 
	else if (mood < 0 )
	{
		emoticon = ":(";
	}
	else if (mood > 3)
	{
		emoticon = "^_^";	
	}	
	else if (mood > -1)
	{
		emoticon = ":)";	
	}
	else {
		emoticon = ":O"; // should never hit here 	
	}
	
	return emoticon;
}

function setMood(val){
  mood = val;

  //updatePlayerPosition();
  //scalePlayerPos(player,mood);
 // moodText.content = 'Mood: ' + mood; 

  moodText.content = 'Mood: ' + displayMood();// + mood; 

  setSkyAlpha( mood / minMood );
  //console.log('scaleMultiplier ' + scaleMultiplier(mood));
  //console.log('scale jump by ' + (JUMP_OFFSET + 1 + (1 - scaleMultiplier(mood))));
  modifyJumpVelocity(JUMP_OFFSET + 1 + (1 - scaleMultiplier(mood)));
  
  if (mood <= minMood) killPlayer();
}
//------------------------------------------------------------------------------
function modifyJumpVelocity( modifier ){
	
	jumpVelocity = INITIAL_JUMP_VELOCITY * modifier;
	//walkVelocity = walkVelocity * modifier;
//  jumpVelocity += modifier;
//  walkVelocity += modifier * 150/350;

  //console.log( "jumpVelocity", jumpVelocity, "walkVelocity", walkVelocity );
}

//------------------------------------------------------------------------------
function killPlayer(){
  //console.log( "killPlayer()" );

  // play death sound
  deathSound.play();

  // decrement lives and update display
  lives--;
  livesText.content = 'Lives: ' + lives;

  // move to end screen if player out of lives
  if ( lives == 0 ){
    createFailScreen();
    gameMode = 2;
  } else {
    resetGame();
  }
};

//------------------------------------------------------------------------------
function playerEndLevel(){
  console.log( "playerEndLevel()" );

  // cleanup current level
  cleanupGame();

  // switch to next level
  currentLevel++;

  if (currentLevel < levels.length){
    // generate next level
    createGame();
    resetGame();
  } else {
    // move to the success screen
    gameMode = 3;
    createWinScreen();
    currentLevel = 0;
  }
}

//------------------------------------------------------------------------------
function addDialog(){
  // add phone image
  phone = game.add.sprite(-100, 64, 'phone');

  hudGroup.add( phone );

  // add tweening animation
  tween = game.add.tween(phone);

  tween.to({ x: 16 },
           1000,
           Phaser.Easing.Linear.None);
  tween.onComplete.add(addDialogText, this);
  tween.start();
}

//------------------------------------------------------------------------------
function addDialogText(){
  var choice = Math.floor(Math.random() * texts.length);
  var text = texts[choice];

  dialogText = game.add.text( 128, 100, text.message,
                              { font: '20px arial', fill: '#FFF' });

  // modify mood
  if (text.good){
    modifyMood( 4 );
  } else {
    modifyMood( -4 );
  }
  
  hudGroup.add( dialogText );

  window.setTimeout( removeDialog, 2000 );
}

//------------------------------------------------------------------------------
function removeDialog(){

  tween = game.add.tween( phone );
  tween.to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None);

  tween.onComplete.add( function(){
    dialogText.destroy();
    phone.destroy();
    moodHit = false;
  });
  tween.start();
}

//------------------------------------------------------------------------------
function goFullScreen(){
  game.stage.scale.startFullScreen();
}

//------------------------------------------------------------------------------
function moodModifierCollide(){
  if (moodHit){
    return;
  }

  // avoid hitting the mood modifier more than once
  moodHit = true;

  // display a dialog
  addDialog();
};
