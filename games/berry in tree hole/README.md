![GitHub Game Off Game Jam](http://webviking.co.uk/github-gameoff/github/screenshot.png)

## "Changing of the Seasons"

Winter. Winter never changes. We find our hero **Alfonso "The Nuts" McSquirrel** facing the coldest winter yet with no stash of food.

Help him collect enough loot to survive the winter, while fighting mean bears over randomly generated levels.

[Play the game](http://webviking.co.uk/github-gameoff/)

## Gameplay

Your main goal is to deliver enough nuts to your nest to survive the winter. The weather is changing fast, so keep your eye on the timer.

![Alfonso](http://webviking.co.uk/github-gameoff/github/alfonso.png) **Alfonso**, the lovable little squirrel at the mercy of your keyboard

![Bears](http://webviking.co.uk/github-gameoff/github/bear.png) **Bears**, the forest bullies that don't want to play ball

![Nuts](http://webviking.co.uk/github-gameoff/github/collectables.png) **Nuts**, you might want to collect these, it'll come handy over long freezing winter

![Nuts](http://webviking.co.uk/github-gameoff/github/heart.png) **Hearts**, collect these in case the bears have beaten you up

![Nest](http://webviking.co.uk/github-gameoff/github/home.png) **Your nest**, you can store any nuts you find here

Deliver enough nuts to get more time or sacrifice some nuts and kill of few of the bears. Succesfully throwing nuts at your nest will also give you some bonus points.

## Controls

Use **left** and **right** key to move Alfonso and **up** key to jump.

While carring a nut hit **space** to throw the nut at bears or at your nest.

## Credits

* [Pertti Soomann](https://twitter.com/toooldtoocold) - code, sprite graphics

## Additional Credits

* [Phaser](https://github.com/photonstorm/phaser) - JavaScript 2D game framework
* [Marc Russell](http://www.spicypixel.net) / [GFXLib FuZED](http://opengameart.org/content/gfxlib-fuzed) - map tiles and background art

## Coming in "Not-enough-time-in-a-day" edition

* I started with idea of level changing as player keeps playing, with some snow effects and updated tile map with settling snow
* Proper menu system, with New Game and Settings options
* Saved high-scores table
* Sound effects
* Bigger levels. Level generation routine could handle it, but framework's tile collision blows up if level is any higher
* Fix graphics in few corner cases when branches are overlapping
* Figure out why physics engine thinks some still nuts are actually moving by 0.0000001, causing bears to be killed as they have been hit by a "flying nut"