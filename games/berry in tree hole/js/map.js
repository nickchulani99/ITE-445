function create_trees(x, y_start, y_end, left_max_length, left_min_length, right_max_length, right_min_length, home)
{
	map.fill(41, x-1, 0, 1, map.layers[0].height-1);
	map.fill(42, x, 0, 1, map.layers[0].height-1);
	map.fill(43, x+1, 0, 1, map.layers[0].height-1);
	
	var side = Math.round(Math.random()); // 0 - left, 1 - right
	
	var length,
		max_length = 6,
		min_length = 3,
		y = y_start,
		x2,
		_y,
		count = 0;
	
	while(1 == 1)
	{	
		count++;
		length = side == 0 ?
			Math.round(left_min_length+(Math.random()*(left_max_length-left_min_length))) :
			Math.round(right_min_length+(Math.random()*(right_max_length-right_min_length))) ;
		y += 1+Math.random()*2.5;
		x2 = x-1;
		
		if (side == 0)
			x2 -= length;
		else
			x2 += 3;

		_y = Math.round(y);

		if (map.getTile(x2, _y+1) !== 0)
			_y -= 1;
		else if (map.getTile(x2, _y) !== 0)
			_y += 2;
		else if (map.getTile(x2, _y-1) !== 0)
			_y += 1;
		
		if (_y > y_end)
			break;

		map.fill(45, x2, _y, length, 1);
		
		if ((home == true && count == 2) || Math.random() < 0.5)
		{
			if (side == 0)
			{
				map.fill(7, x2, _y, 1, 1);
				map.fill(8, x2+length, _y, 1, 1);
				map.fill(47, x2+length, _y+1, 1, 1);
				if (home == true && count == 2)
				{
					map.fill(27, x2+length, _y-1, 1, 1);
					home_x = (x2+length+0.5) * layer.tileWidth;
					home_y = (_y-0.5) * layer.tileHeight;
				}
			}
			else
			{
				map.fill(46, x2+length-1, _y, 1, 1);
				map.fill(44, x+1, _y, 1, 1);
				map.fill(48, x+1, _y+1, 1, 1);
				if (home == true && count == 2)
				{
					map.fill(28, x2-1, _y-1, 1, 1);
					home_x = (x2-0.5) * layer.tileWidth;
					home_y = (_y-0.5) * layer.tileHeight;
				}
			}			
		}
		else
		{
			if (side == 0)
			{
				map.fill(29, x2, _y, 1, 1);
			}
			else
			{
				map.fill(9, x2+length, _y, 1, 1);
			}
		}
		
		left_max_length *= 0.9;
		left_min_length *= 0.9;
		right_max_length *= 0.9;
		right_min_length *= 0.9;

		side = side == 1 ? 0 : 1;
	}
	
	home_hit = new Phaser.Rectangle(home_x+2, home_y+2, 12, 12);
}

function create_map()
{
	// create ground
	var x1 = -1,
		x2 = -1;
		
	for(var x=0;x<map.layers[0].width;x++)
	{
		var t = map.getTile(x, map.layers[0].height-2);
		if (t == 0 || t == 41 || t == 42 || t == 43)
		{
			if (x1 == -1)
			{
				x1 = x;
			}
			x2 = x;
		}
	}

	map.fill(12, x1-1, map.layers[0].height-1, 1, 1);
	map.fill(3, x1, map.layers[0].height-1, x2-x1+1, 1);
	map.fill(13, x2+1, map.layers[0].height-1, 1, 1);
}

function create_map_bg_side(direction)
{
	var height = 22,
		width = 23,
		s_max_d = 3,
		x = direction == 1 ? -1 : map.layers[0].width,
		_x = -1,
		_st = -1,
		tile_top_side = direction == 1 ? 70 : 69;
		tile_top_other_side = direction == 1 ? 69 : 70;
		tile_top_middle = 111;
		tile_side = direction == 1 ? 92 : 91;
		tile_other_side = direction == 1 ? 91 : 92;
		tile_side_end = 105;
		tile_side_other_end = 105;
	
	while(height > 0 && ((direction == 1 && x < width) || (direction == -1 && x > map.layers[0].width - width)))
	{
		x += direction;
		height -= s_max_d;
		s_max_d *= 0.80;
		
		if (height > 0.5)
		{
			
			var r = height;
			var ra = Math.floor((Math.random()*10)+1);
			if (ra === 1 || ra === 7  || ra === 4)
				r += Math.random()*6-4;
			r = Math.round(r);
			var st = layer._maxY-r;
			if (st >= layer._maxY)
				break;
			else if (st < 0)
				st = 0;

			r -= 1;
			map_bg.fill(105, x, st, 1, r, 0);
			map_bg.fill(tile_top_side, x, st, 1, 1);
			if (_x != -1)
			{
				var _d = st - _st;
				if (_d > 0)
				{
					map_bg.fill(tile_side, _x, _st, 1, st-_st);
				}
				var prev_tile = map_bg.getTile(_x, st, 0);
				if (prev_tile == tile_top_side)
					map_bg.fill(tile_top_middle, _x, st, 1, 1);
				else if (prev_tile != 0)
					map_bg.fill(tile_side_end, _x, st, 1, 1);
				else
				{
					map_bg.fill(tile_other_side, _x, st, 1, _st-st-1);
					map_bg.fill(tile_top_other_side, _x, st, 1, 1);
					map_bg.fill(tile_side_other_end, _x, _st-1, 1, 1);
				}
			}
			
			_st = st+1;
			_x = x;
		}
	}
}

function create_map_side(direction)
{
	var height = 19,
		width = 18,
		s_max_d = 3,
		x = direction == 1 ? -1 : map.layers[0].width,
		_x = -1,
		_st = -1,
		tile_top_side = direction == 1 ? 4 : 2;
		tile_top_other_side = direction == 1 ? 2 : 4;
		tile_top_middle = 3;
		tile_side = direction == 1 ? 11 : 10;
		tile_other_side = direction == 1 ? 10 : 11;
		tile_side_end = direction == 1 ? 12 : 13;
		tile_side_other_end = direction == 1 ? 13 : 12;
	
	while(height > 0 && ((direction == 1 && x < width) || (direction == -1 && x > map.layers[0].width - width)))
	{
		x += direction;
		height -= s_max_d;
		s_max_d *= 0.83;

		if (height > 0.5)
		{
			var r = height;

			var ra = Math.floor((Math.random()*10)+1);
			if (ra === 1 || ra === 7)
				r += Math.random()*4-2;
			r = Math.round(r);
			var st = layer._maxY-r;
			if (st >= layer._maxY)
				break;
			else if (st < 0)
				st = 0;

			r -= 1;
			
			map.fill(85, x, st, 1, r);
			
			map.fill(tile_top_side, x, st, 1, 1);

			if (_x != -1)
			{
				var _d = st - _st;
				if (_d > 0)
				{
					map.fill(tile_side, _x, _st, 1, st-_st);
				}

				var prev_tile = map.getTile(_x, st);
				if (prev_tile == tile_top_side)
					map.fill(tile_top_middle, _x, st, 1, 1);
				else if (prev_tile != 0)
					map.fill(tile_side_end, _x, st, 1, 1);
				else
				{
					map.fill(tile_other_side, _x, st, 1, _st-st-1);
					map.fill(tile_top_other_side, _x, st, 1, 1);
					map.fill(tile_side_other_end, _x, _st-1, 1, 1);
				}
			}

			var options = [14, 15, 34, 35, 54, 55];
			for (var i=0; i<r/2.5; i++)
			{
			
				ra = Math.floor((Math.random()*(layer._maxY-st)))+st+1;
				if (map.getTile(x, ra) == 85)
				{
					var ai = Math.floor(Math.random()*options.length);
					map.fill(options[ai], x, ra, 1, 1);
					if (options.length == 1)
						options = [14, 15, 34, 35, 54, 55];
					else
						options.splice(ai, 1);					
				}	
			}
			_st = st+1;
			_x = x;
		}
	}
}