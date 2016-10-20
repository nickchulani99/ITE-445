function Enemy() {};

Enemy.prototype.create = function()
{
	this.in_air = true;
	this.dead = false;
	this.bound_x1 = false;
	this.bound_x2 = false;
	this.turns = false;
	this.jumpTimer = false;
	this.min_height = 50 + Math.random() * 100;
	this.hitarea = false;
	this.sprite = game.add.sprite(200+Math.random()*(layer.widthInPixels - 400), 0, 'enemy');
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.allowGravity = true;
    this.sprite.body.gravity.y = 9;
    this.sprite.body.setSize(12, 1, -1, 43);
	this.sprite.anchor.setTo(.5, 0);
	this.sprite.animations.add('walk', [0, 1, 2, 1]);
	this.sprite.animations.add('jump', [3]);
	this.sprite.animations.add('dead', [4]);
	this.sprite.animations.play('jump', 0, false);
}

Enemy.prototype.update = function()
{
	if (this.sprite.visible)
	{
		// colide with flying nut
		this.hitarea = new Phaser.Rectangle(this.sprite.body.center.x-10, this.sprite.body.center.y-20, 20, 36)
		
		if (this.min_height == false)
		{
			for (var i=nuts.length-1; i>=0; i--)
			{
				if (!this.dead && nuts[i].visible && (
					nuts[i].body.velocity.x != 0 || 
					nuts[i].body.velocity.y != 0) 
					&& Phaser.Rectangle.intersects(this.hitarea, new Phaser.Rectangle(
					nuts[i].body.x, 
					nuts[i].body.y,
					nuts[i].width, 
					nuts[i].height)))
				{
					nuts[i].visible = false;
					nuts[i].body.gravity.y = 0;
					this.hit_nut(nuts[i].body.velocity.x > 0 ? 1 : -1);
				}
			}
		}

		if (!this.dead)
		{
			if (this.min_height)
			{
				if (this.sprite.y >= this.min_height)
					this.min_height = false;
			}
			else
			{
				game.physics.collide(this.sprite, layer);
				if (this.in_air)
				{
					if (this.sprite.body.touching.down)
					{
						this.in_air = false;
						this.turns = Math.round(2 + Math.random() * 12);

						var x = Math.floor(this.sprite.body.x/16),
							y = 1+Math.floor(this.sprite.body.y/16);

						var i = 0,
							t = false;
						while(!this.bound_x1 || !this.bound_x2)
						{
							if (!this.bound_x1)
							{
								t = map.getTile(x-i, y);
								if (t == 29 || t == 7 || t == 44 || t == 2)
								{
									this.bound_x1 = (x-i)*16+8;
								}
								else if (t == 43)
								{
									this.bound_x1 = (x-i+1)*16+8;
								}
								else if (t == 12)
								{
									this.bound_x1 = (x-i+1)*16+13;
								}
							}

							if (!this.bound_x2)
							{
								t = map.getTile(x+i, y);
								if (t == 9 || t == 46 || t == 8 || t == 4)
								{
									this.bound_x2 = (1+x+i)*16-8;
								}
								else if (t == 41)
								{
									this.bound_x2 = (x+i)*16-8;
								}
								else if (t == 13)
								{
									this.bound_x2 = (x+i)*16-13;
								}
							}
							
							i++;
						}
						
						if (this.bound_x1 == this.bound_x2)
							this.turns = 0;
							
						this.sprite.body.velocity.x = (this.sprite.body.velocity.x > 0 ? 1 : -1) * (40 + Math.random()*20);
						this.sprite.scale.x = this.sprite.body.velocity.x > 0 ? 1 : -1;
						
						this.sprite.animations.play('walk', 6, true);
					}
				}
				else
				{
					if (this.sprite.body.x < this.bound_x1 || this.sprite.body.x > this.bound_x2)
					{
						this.turns--;
						if (this.turns == 0)
							this.jump();
						else
						{
							this.sprite.body.velocity.x *= -1;
							this.sprite.scale.x = this.sprite.body.velocity.x > 0 ? 1 : -1;
						}
					}				
				}
				
				// hit player
				if (player.alpha == 1 && Phaser.Rectangle.intersects(player_hit, this.hitarea))
				{
					player.alpha = 0.5;
					player.hittimer = game.time.now + 2500;
					lives--;
					update_life();
				}
			}
		}
		else
		{
			if (this.sprite.body.y > layer.heightInPixels + 30)
			{
				this.sprite.visible = false;
				this.dead = false;
				this.sprite.body.allowGravity = false;
			}
		}
	}
}

Enemy.prototype.jump = function()
{
	this.in_air = true;
	this.bound_x1 = false;
	this.bound_x2 = false;
	this.turns = false;
	this.jumpTimer = game.time.now + 750;
	this.sprite.body.velocity.y = -230;
	this.sprite.body.velocity.x = this.sprite.body.velocity.x > 0 ? 75 : -75;
	this.sprite.animations.play('jump', 0, false);
}

Enemy.prototype.hit_nut = function(side)
{
	if (!this.dead)
	{
		this.dead = true;
		this.sprite.body.velocity.x = side * 100;
		this.sprite.body.velocity.y = -200;
		this.sprite.body.gravity.y = 7;
		this.sprite.body.collideWorldBounds = false;
		this.sprite.animations.play('dead');
		level.update_score(25);
	}
}