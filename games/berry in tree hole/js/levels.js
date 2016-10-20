function Levels () {

	this.level = -1;
	this.timer = 0;
	this.to_collect = 0;
	this.total_to_collect = 0;
	this.gameover = false;
	this.game_over_screen = false;
	this.score = 0;
	this.timer_text = false;
	this.score_text = false;

	// nut drop, health drop, enemy drop, time bonus, nuts required to complete
	this.level_config = [
		[5, 0, 0, 40, 4],
		[5, 1, 0, 13, 4],
		[5, 0, 0, 13, 4],
		[5, 1, 1, 13, 4],
		[5, 0, 1, 13, 4],
		[5, 1, 2, 13, 4],
		[6, 0, 1, 13, 5],
		[6, 0, 0, 13, 5],
		[6, 0, 1, 15, 5],
		[6, 1, 0, 15, 5],
		[7, 0, 2, 15, 5],
		[7, 0, 2, 15, 5],
		[7, 0, 1, 15, 6],
		[7, 1, 0, 15, 6],
		[7, 0, 3, 15, 6],
		[7, 1, 0, 15, 6],
		[7, 1, 0, 15, 6],
		[8, 0, 0, 17, 7],
		[8, 0, 0, 17, 7],
		[8, 0, 0, 17, 7],
		[8, 0, 0, 17, 7],
		[8, 0, 4, 17, 7],
		[8, 0, 2, 17, 7],
		[9, 1, 0, 17, 8],
		[9, 1, 0, 17, 8],
		[9, 1, 1, 17, 8],
		[9, 1, 0, 17, 8],
		[9, 1, 1, 17, 8],
		[9, 1, 0, 17, 8],
		[9, 1, 2, 17, 8],
	];
};

Levels.prototype.update = function()
{
	if (!game.paused)
	{
		this.timer -= (game.time.elapsed/1000);
		if (this.timer <= 0)
			this.game_over();
		else
		{
			if (this.to_collect <= 0)
				this.level_up();
				
			if (this.timer_text == false)
			{
				var text = '00:00';
				var style = { font: 'bold 16px Arial', fill: '#ffffff', align: 'center', stroke: '#666666', strokeThickness: 2};

				this.timer_text = game.add.text(game.width/2, 10, text, style);
				this.timer_text.anchor.setTo(0.5, 0.5);
				ui_group.add(this.timer_text);
			}
			
			if (this.score_text == false)
			{
				var text = '00000000';
				var style = { font: 'bold 25px Arial', fill: '#ffffff', align: 'center', stroke: '#666666', strokeThickness: 2};
				this.score_text = game.add.text(game.width-65, 15, text, style);
				this.score_text.anchor.setTo(0.5, 0.5);
				ui_group.add(this.score_text);
			}
			
			var s1 = '00'+(Math.floor(this.timer / 60));
			var s2 = '00'+parseInt(this.timer % 60);
			s1 = s1.substr(s1.length-2);
			s2 = s2.substr(s2.length-2);
			this.timer_text.setText(s1+':'+s2);
		}
	}
}

Levels.prototype.update_score = function(add)
{
	this.score += add;
	var s = '00000000' + this.score;
	s = s.substr(s.length-8);
	this.score_text.setText(s);
}

Levels.prototype.level_up = function()
{
	this.level++;
	if (this.level > this.level_config.length - 1)
	{
		this.game_over(true);
	}
	else
	{
		this.total_to_collect = this.to_collect = this.level_config[this.level][4];
		this.timer += this.level_config[this.level][3];
		create_nuts(this.level_config[this.level][0], this.level_config[this.level][1], this.level_config[this.level][2]);
	}
}

Levels.prototype.game_over = function(beat_the_game)
{
	this.gameover = true;
	if (!this.game_over_screen)
	{
		var s = '00000000' + this.score;
		s = s.substr(s.length-8);

		var text = '';
		
		if (beat_the_game)
		{
			text = "CHAMPION!\nYOU BEAT THE GAME!\n\nYour Score\n"+s;
		}
		else
		{
			if (this.timer <= 0)
			{
				text = "COMPLETE WINTER STASH\nBEFORE TIME RUNS OUT\n\nYour Score\n"+s;
			}
			else
			{
				text = "YOU CAN KILL BEARS\nBY THROWING NUTS\n\nYour Score\n"+s;
			}
		}

		var style = { font: 'bold 28px Arial', fill: '#ffffff', align: 'center', stroke: '#000000', strokeThickness: 6};

		this.game_over_screen = game.add.text(game.camera.view.x + game.width/2, game.height/2, text, style);
		this.game_over_screen.fixedToCamera = false;
		this.game_over_screen.anchor.setTo(0.5, 0.5);

		for(var i=enemies.length-1; i >= 0; i--)
		{
			if (enemies[i].sprite.visible)
			{
				enemies[i].sprite.body.velocity.x = 0;
				enemies[i].sprite.body.velocity.y = 0;
				enemies[i].sprite.body.gravity.x = 0;
				enemies[i].sprite.body.gravity.y = 0;
				enemies[i].sprite.animations.paused = true;
			}
		}
		
		for (var i=nuts.length-1; i >= 0; i--)
		{
			if (nuts[i].visible)
			{
				nuts[i].body.velocity.x = 0;
				nuts[i].body.velocity.y = 0;
				nuts[i].body.gravity.x = 0;
				nuts[i].body.gravity.y = 0;
				nuts[i].body.mass = 0;
			}
		}
		
		health_drop.body.velocity.x = 0;
		health_drop.body.velocity.y = 0;
		health_drop.body.gravity.x = 0;
		health_drop.body.gravity.y = 0;
		
		player.animations.paused = true;
		if (beat_the_game == undefined)
		{
			player.alpha = 0.5;
			player.body.mass = 0.1;
			player.body.velocity.x = (player.body.velocity.x > 0 ? 1 : -1) * 50;
			player.body.velocity.y = -100;

			player.body.collideWorldBounds = false;
			player.body.gravity.y = 4;
		}
		else
		{
			player.body.mass = 0;
			player.body.velocity.x = 0;
			player.body.velocity.y = 0;
			player.body.gravity.x = 0;
			player.body.gravity.y = 0;
		}

		game.camera.follow(false);
	}
}

Levels.prototype.deliver_nut = function(score)
{
	if (score == undefined)
		score = 10;
	this.to_collect--;
	this.update_score(score);
	
	var complete = Math.round((1-(this.to_collect/this.total_to_collect)) * 100);
	
	if (complete >= 100)
		complete = 0;
		
	progress.clear();
	progress = game.add.graphics(0, 0);
	progress.beginFill(0xFFCC00);
	progress.drawRect(parseInt(game.width/2)-50, 20, complete, 6);
	progress.endFill();
	ui_group.add(progress);
}