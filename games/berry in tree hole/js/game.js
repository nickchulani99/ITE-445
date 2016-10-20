var game = new Phaser.Game(640, 400, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update, render: render });

var level_width = 75,
	level_height = 24;

var sprite,
	delta_x = 5,
	delta_y = -5,
	layer,
	layer_bg,
	map,
	map_bg,
	tileset,
	input,
	player,
	jumpTimer = 0,
	jumpButton,
	facing = 'right',
	nuts = [],
	player_hit,
	home_hit,
	has_nut = false,
	nut,
	actionButton,
	debug = false,
	actionButtonDown = false,
	home_x = 0,
	home_y = 0,
	distance,
	hearts = [],
	header,
	level = new Levels,
	lives = 3,
	health_drop,
	enemies = [],
	progress_bg,
	progress,
	ui_group;

function preload()
{
	game.load.image('bg', 'gfx/bg.png');
	game.load.image('nut', 'gfx/nut.png');
	game.load.image('header', 'gfx/header.png');
	game.load.spritesheet('heart', 'gfx/heart.png', 16, 16);
	game.load.spritesheet('player', 'gfx/player.png', 32, 48);
	game.load.spritesheet('enemy', 'gfx/enemy.png', 32, 48);
	game.load.tileset('tiles', 'gfx/tiles.png', 16, 16);
}

function create()
{
	game.stage.backgroundColor = '#787878';

	sprite = game.add.sprite(0, 0, 'bg');
	sprite.fixedToCamera=true;

	map = new Phaser.Tilemap(game);
	map.create('Ground', level_width, level_height);
	map.currentLayer = 0;

	map_bg = new Phaser.Tilemap(game);
	map_bg.create('Ground', level_width, level_height);
	map_bg.currentLayer = 0;
	
	tileset = game.add.tileset('tiles');

	tileset.setCollisionRange(6, 8, false, false, true, false);
	tileset.setCollision(13, true, true, true, true);
	tileset.setCollision(84, true, true, true, true);
	
	tileset.setCollisionRange(1, 4, true, true, true, false);
	tileset.setCollisionRange(9, 11, true, true, true, false);

	tileset.setCollisionRange(13, 14, true, true, true, false);
	tileset.setCollisionRange(33, 34, true, true, true, false);
	tileset.setCollisionRange(53, 54, true, true, true, false);
	
	tileset.setCollisionRange(28, 30, false, false, true, false);
	tileset.setCollisionRange(43, 45, false, false, true, false);	
	
	/*
	layer_bg = game.add.tilemapLayer(0, 0, map.layers[0].width*tileset.tileWidth, 600, tileset, map_bg, 0);
	layer_bg.fixedToCamera=false; 
    layer_bg.resizeWorld();
	*/
	
	layer = game.add.tilemapLayer(0, 0, map.layers[0].width*tileset.tileWidth, 600, tileset, map, 0);
	layer.fixedToCamera=false;
	
	// clear for now
	map_bg.fill(0, 0, 0, map.layers[0].width, map.layers[0].height);
	create_map_bg_side(1);
	create_map_bg_side(-1);
	
	map.fill(85, 0, layer._maxY-1, layer._maxX, 1);
	create_map_side(1);
	create_map_side(-1);
	create_map();
	
	create_trees(
		Math.round(map.layers[0].width/2),
		2, map.layers[0].height-10, 7, 3, 7, 3, true
	);
	
	create_trees(
		Math.round(map.layers[0].width/2 - 9 - Math.random()*4),
		4, map.layers[0].height-3, 12, 3, 6, 3, false
	);
	
	create_trees(
		Math.round(map.layers[0].width/2 + 9 + Math.random()*4),
		4, map.layers[0].height-3, 6, 3, 12, 3, false
	);

	input = game.input.keyboard.createCursorKeys();
	jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	actionButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
	layer.resizeWorld();

	player = game.add.sprite(200, 0, 'player');
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 9;
    player.body.setSize(12, 1, -1, 43);
	player.anchor.setTo(.5, 0);
	player.hittimer = 0;
	
	player.animations.add('idle', [0, 0, 0, 0, 0, 0, 1]);
	player.animations.add('idle_hold', [2, 2, 2, 2, 3, 3, 3]);
	player.animations.add('walk', [4, 5, 6, 5]);
	player.animations.add('walk_hold', [8, 9, 10, 9]);
	player.animations.add('jump', [7]);
	player.animations.add('jump_hold', [11]);
	game.camera.follow(player);
	
	health_drop = game.add.sprite(0, 0, 'heart');
	health_drop.body.collideWorldBounds = true;
	health_drop.body.gravity.y = 9;
	health_drop.body.bounce.x = 0.4;
	health_drop.body.bounce.y = 0.4;
	health_drop.body.setSize(14, 14, 0, 0);
	health_drop.anchor.setTo(.5, .5);	
	health_drop.visible = false;
	health_drop.body.allowGravity = false;

	ui_group = game.add.group(null);
	
	header = game.add.sprite(0, 0, 'header');
	header.anchor.setTo(0, 0);
	header.cameraOffset.x = 0;
    header.cameraOffset.y = 0;
	// header.fixedToCamera = true;
	
	ui_group.add(header);
	
	for (var i=0; i<5; i++)
	{
		var tmp;
		tmp = game.add.sprite(10+(16*i), 7, 'heart');
		// tmp.cameraOffset.x = 10 + 16*i;
		// tmp.cameraOffset.y = 12;
		tmp.animations.add('full', [0]);
		tmp.animations.add('empty', [1]);
		// tmp.fixedToCamera = true;
		tmp.animations.play(i<lives ? 'full' : 'empty', 0, false);		
		ui_group.add(tmp);
		hearts.push(tmp);
	}
	
	progress_bg = game.add.graphics(0, 0);
	progress_bg.lineStyle(2, 0x666666, 1);
	progress_bg.beginFill(0x333333);
	progress_bg.drawRect(parseInt(game.width/2)-51, 19, 102, 8);
	progress_bg.endFill();
	ui_group.add(progress_bg);
	
	progress = game.add.graphics(0, 0);	
	ui_group.add(progress);
	
	level.level_up();	
}

function create_nuts(nut_count, health_count, enemy_count)
{
	var max = 14,
		count_1 = nut_count > max ? Math.floor(nut_count / max) : 1,
		count_2 = nut_count > max ? nut_count % max : 0;
	
	if (count_1 == 1 && count_2 == 0)
		max = nut_count;
	
	if (count_1 > 0)
	{
		for(var i=0; i<count_1; i++)
			place_nuts(max);
	}
	
	if (count_2 > 0)
		place_nuts(count_2);

	if (health_count > 0)
	{
		if (lives < 5 && health_drop.visible == false)
		{
			var tmp = 300;
			health_drop.x = (game.world.width/2)-tmp+(Math.random()*tmp);
			health_drop.y = Math.random()*20;
			health_drop.body.velocity.x = Math.random()*60-30;
			health_drop.body.velocity.y = Math.random()*100-50;
			health_drop.visible = true;
			health_drop.body.allowGravity = true;
		}
	}

	if (enemy_count > 0)
	{
		for(var i=enemies.length-1; i>=0; i--)
		{
			if (enemy_count > 0 && enemies[i].sprite.visible == false)
			{
				enemies[i] = new Enemy();
				enemies[i].create();
				enemy_count--;
			}
		}
	}
	
	if (enemy_count > 0)
	{
		var l = enemies.length;
		for(var i=0; i<enemy_count; i++)
		{
			enemies.push(new Enemy());
			enemies[l].create();
			l++;
		}
	}

	player.bringToTop();
}

function place_nuts(count)
{
	var past_middle = false;	
	var _x = 60,
		x = Math.round(home_x-(_x*(count/2))),
		x2,
		_c = 0,
		_c2 = count/2;

	for (var i=nuts.length-1; i>=0; i--)
	{
		if (count > 0 && !nuts[i].visible)
		{
			_c++;
			x2 = x;
			nuts[i] = create_nut(Math.round(x), Math.random()*40, Math.random()*30-15, Math.random()*100-50);
			count--;
			x += _x;
			if (_c >= _c2 && !past_middle)
			{
				x += _x;
				past_middle = true;
			}
		}
	}

	if (count > 0)
	{
		for (var i=0; i<count; i++)
		{
			_c++;
			x2 = x;
			nuts.push(create_nut(Math.round(x), Math.random()*40, Math.random()*30-15, Math.random()*100-50));		
			x += _x;
			if (_c >= _c2 && !past_middle)
			{
				x += _x;
				past_middle = true;
			}
		}
	}
}

function create_nut(x, y, vel_x, vel_y)
{
	x = x || 0;
	y = y || 0;
	vel_x = vel_x || 0;
	vel_y = vel_y || 0;

	var nut2 = game.add.sprite(x, y, 'nut');

	nut2.body.collideWorldBounds = true;
	nut2.body.allowGravity = true;
	nut2.body.gravity.y = 9;
	nut2.body.bounce.x = 0.4;
	nut2.body.bounce.y = 0.4;
	nut2.body.setSize(14, 14, 0, 0);
	nut2.anchor.setTo(.5, .5);
	nut2.body.velocity.x = vel_x;
	nut2.body.velocity.y = vel_y;

	return nut2;
}

function update_life()
{
	var total = hearts.length;
	for(var i=0; i<total; i++)
	{
		hearts[i].animations.play(i < lives ? 'full' : 'empty', 0, false);
	}
	
	if (!level.gameover && lives == 0)
	{
		level.game_over();
	}
}

function update()
{
	if (!level.gameover)
	{
		game.physics.collide(player, layer);
		
		player_hit = new Phaser.Rectangle(player.body.x, player.body.y-20, player.body.width, player.body.height+20);
		
		if (game.time.now > player.hittimer)
			player.alpha = 1;
		
		if (health_drop.visible)
		{
			game.physics.collide(health_drop, layer);

			if (health_drop.body.touching.down)
			{
				health_drop.body.velocity.x *= 0.9;
				health_drop.body.velocity.y *= 0.9;
			}
			
			if (Math.abs(health_drop.body.velocity.y) < 6)
				health_drop.body.velocity.y = 0;

			if (Math.abs(health_drop.body.velocity.x) < 6)
				health_drop.body.velocity.x = 0;
				
			if (lives < 5 && Phaser.Rectangle.intersects(player_hit, new Phaser.Rectangle(health_drop.body.x, health_drop.body.y, health_drop.body.width, health_drop.body.height)))
			{
				health_drop.visible = false;
				health_drop.body.allowGravity = false;
				lives++;
				update_life();
			}
		}	
		
		for (var i=nuts.length-1; i>=0; i--)
		{
			if (nuts[i].visible == true)
			{
				game.physics.collide(nuts[i], layer);
				for (var j=nuts.length-1; j>=0; j--)
				{
					if (i !== j && nuts[j].visible)
						game.physics.collide(nuts[i], nuts[j]);
				}

				if (Math.abs(nuts[i].body.velocity.y) < 3)
					nuts[i].body.velocity.y = 0;

				if (nuts[i].body.touching.down)
				{
					if (nuts[i].body.velocity.x != 0)
					{
						nuts[i].body.velocity.x *= 0.9;  
						if (Math.abs(nuts[i].body.velocity.x) < 1)
							nuts[i].body.velocity.x = 0;
					}

					if (!has_nut && !actionButtonDown && nuts[i].visible == true && Phaser.Rectangle.intersects(player_hit, new Phaser.Rectangle(nuts[i].body.x, nuts[i].body.y, nuts[i].body.width, nuts[i].body.height)))
					{
						has_nut = true;
						nuts[i].visible = false;
						nuts[i].body.allowGravity = false;
						nuts[i].body.gravity.y = 0;
					}
				}
				
				if (Math.abs(nuts[i].body.velocity.x) > 10 || Math.abs(nuts[i].body.velocity.y) > 10)
				{
					var tmp = new Phaser.Rectangle(nuts[i].body.x, nuts[i].body.y, nuts[i].body.width, nuts[i].body.height);
					if (tmp.intersects(home_hit))
					{
						nuts[i].visible = false;
						nuts[i].body.allowGravity = false;
						level.deliver_nut(15);
					}
				}
			}
		}
		
		for (var i=enemies.length-1; i>= 0; i--)
		{
			enemies[i].update();
		}
		
		player.body.velocity.x = 0;

		if (input.left.isDown)
		{
			if (player.body.touching.down)
				player.animations.play(has_nut ? 'walk_hold' : 'walk' , 6, true);
			else
				player.animations.play(has_nut ? 'jump_hold' : 'jump', 1, true);
				
			player.body.velocity.x = -150;
			if (facing != 'left')
			{
				facing = 'left';
				player.scale.x *= -1;
			}
		}
		else if (input.right.isDown)
		{
			if (player.body.touching.down)
				player.animations.play(has_nut ? 'walk_hold' : 'walk', 6, true);
			else
				player.animations.play(has_nut ? 'jump_hold' : 'jump', 1, true);
			player.body.velocity.x = 150;
			if (facing != 'right')
			{
				facing = 'right';
				player.scale.x *= -1;
			}
		}
		else
		{
			if (player.body.touching.down)	
				player.animations.play(has_nut ? 'idle_hold' : 'idle', 4, true);
			else
				player.animations.play(has_nut ? 'jump_hold' : 'jump', 1, true);
		}
		
		if (jumpButton.isDown && player.body.touching.down && game.time.now > jumpTimer)
		{
			player.body.velocity.y = -214;
			jumpTimer = game.time.now + 750;
		}

		if (actionButton.isDown)
		{
			if (!actionButtonDown && has_nut)
			{
				has_nut = false;
				actionButtonDown = true;
				var found = false;
				for (var i=nuts.length-1; i>=0; i--)
				{
					if (!found)
					{
						if (nuts[i].visible == false)
						{
							nuts[i].x = player.x;
							nuts[i].y = player.y+10;
							nuts[i].body.velocity.x = facing == 'left' ? -300 : 300;
							nuts[i].body.velocity.y = -50;
							nuts[i].body.allowGravity = true;
							nuts[i].body.gravity.y = 9;
							nuts[i].visible = true;
							found = true;
						}
					}
				}
			}
		}
		else
			actionButtonDown = false;
			
		if (has_nut)
		{
			var sx = home_x - (player.body.x + 5);
			sx *= sx;
			var sy = home_y - (player.body.y - 9);
			sy *= sy;
			var distance = Math.sqrt(sx + sy);
			if (distance < 8)
			{
				has_nut = false;
				level.deliver_nut();
			}
		}
		
		level.update();
	}
}

function render()
{
	/*
	if (enemies[0].bound_x1)
	{
		var x = Math.floor(enemies[0].bound_x1/16),
			y = 1+Math.floor(enemies[0].sprite.body.y/16);
		game.debug.renderRectangle(new Phaser.Rectangle(x*16+layer.offset.x, y*16+layer.offset.y, 16, 16));
	}
	
	if (enemies[0].bound_x2)
	{
		var x = Math.floor(enemies[0].bound_x2/16),
			y = 1+Math.floor(enemies[0].sprite.body.y/16);
		game.debug.renderRectangle(new Phaser.Rectangle(x*16+layer.offset.x, y*16+layer.offset.y, 16, 16));
	}
	*/

	if (debug)
	{
		// game.debug.renderSpriteBody(enemies[0].sprite);
	
		game.debug.renderSpriteBody(player);
		
		game.debug.renderSpriteInfo(nuts[0], 32, 32);
		/*game.debug.renderText('H x: '+home_x+' y: '+home_y, 400, 32);
		
		game.debug.renderCircle(new Phaser.Circle(home_x+layer.offset.x, home_y+layer.offset.y, 16));
		
		game.debug.renderText('D: '+distance, 400, 64);*/
		for (var i=nuts.length-1; i>=0; i--)
		{
			game.debug.renderSpriteBody(nuts[i]);
		}
		
		// game.debug.renderRectangle(enemies[0].hitarea);
	}
}