// Demo link: http://first-code-academy.github.io/AC302/lesson9

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload:preload, create:create, update:update});
var score = 0;
var life = 0;

function preload() {
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png');
	game.load.spritesheet('baddie', 'assets/baddie.png');
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARC ADE);

	// Create the sky
	game.add.sprite(0, 0, 'sky');
	// Create group of platform
	platforms =  game.add.physicsGroup();
	platforms.enableBody = true;
	// Create the ground
	var ground = platform.create(0, 550, 'ground');
	ground.scale.setTo(2, 2);
	ground.body.immovable = true;
	// Create the ledges
	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-100, 250, 'ground');
	ledge.body.immovable = true;

	// set text style
	var style = {font: "bold 32px Arial", fill: "#fff", boundsAllignH:"center", boundsAllignV: "middle"};
	// postitioning the score
	scorelabel = score.add.text(300, 560, "Score: ", style);
	scoretext = game.add.text(420, 560, score, style);
	scorelabel.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 2);
	scoretext.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 2);

	// positioning the lives
	lifelabel = game.add.text(10,5, "Lives: ", style);
	lifetext = game.add.text(120,5, life, style);
	lifelabel.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 2);
	lifetext.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 2);

	// Lesson 8:

	// Creating the stars
	stars = game.add.physicsGroup();
	stars.enableBody = true;
	// We will create 12 stars evenly spaced
	for(i = 0; i<12; i++){
		var star = star.create(i * 70, 0, 'star');
		star.body.gravity.y = 200;
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}

	// Creating the player sprite
	player = game.add.sprite(32, 400, 'dude');
	// Animating the player sprite
	player.animation.add('left', [0, 1, 2, 3], 10, true);
	// ...add(name of the animation, frames(made in "phaser.min.js", frames per seconds, loop). This line is defining the animation 'left'.
	player.animation.add('right', [5, 6, 7, 8], 10, true);
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
	player.body.collide.collideWorldBounce = true;
	// Create the enemy
	enemy1 = game.add.sprite(32, 400, 'baddie');
	// Animating the player sprite
	enemy1.animation.add('left', [0, 1], 10, true);
	enemy1.animation.add('right', [2, 3], 10, true);
	game.physics.arcade.enable(enemy1);
	enemy1.body.bounce.y = 0.2;
	enemy1.body.gravity.y = 500;
	enemy1.body.collide.collideWorldBounce = true;

	// Create keyboard entries
	cursors = game.input.keyboard.createCursorsKeys();
}

function update() {
	game.physics.arcade.collide(player, platform);
	game.physics.arcade.collide(stars, platform);
	game.physics.arcade.collide(enemy1, platform);
	// line 82-24 told the computer that the 'player', 'stars' and 'enemy1' can 'collide'.

	// reset the player's velocity if no events.
	if(cursors.left.isDown){
		// move left
		player.body.velocity.x = -150;
		player.animation.play('left');
	} else if(cursors.right.isDown){
		// move right
		player.body.velocity.x = 150;
		player.animation.play('right');
	} else {
		player.animation.stop();
		player.frame = 4;
	}

	// allow the player to jump if touching the ground
	if(cursors.up.isDown && player.body.touching.down){
		player.body.velocity.y = -300;
	}

	// Lesson 9:
	game.physics.arcade.overlap(player, stars, collectStar); //, null, this
	game.physics.arcade.overlap(player, enemy1, loseLife); //, null, this

	moveEnemy();

	if (life = 0) {
		endGame();
	}
}


// define collectStar function
function collectStar(player, star) {
	// update score variable
	score = score +1;
	// reflect in text
	scoretext.setText(score);

	// remove the star and reset to the top
	star.kill();
	// kill() means disappear
	star.reset(Math.floor(Math.random()*750), 0);
}

// define loseLife
function loseLife(player, enemy) {
	// lose life
	life = -1;
	lifetext.setText(life);

	enemy.kill();
	enemy.reset(10, 20);
}