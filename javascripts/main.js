var game =  {
	init: function() {
		var startingY = document.getElementById('svgRoot').getBBox().x - WINDOW_BUFFER - RUNNER_HEIGHT;
		this.runner = new Runner(WINDOW_BUFFER, startingY);
		this.bullets = [];
		this.enemies = [];
		this.keysDown = [];
		this.lastBullet = 0;
		this.lastEnemy = 0;

		this.setUpListeners();

		this.mainloop();
	},
	mainloop: function() {
		setInterval(function() {
			var timestamp = new Date().getTime();

			this.processKeys();

			if (!this.runner.isUpdated) {
				this.runner.update();
			}

			// test collisions
			for (var i = this.bullets.length - 1; i >= 0; i--) {
				for (var j = this.enemies.length - 1; j >= 0; j--) {
					if (this.testCollision(this.bullets[i], this.enemies[j])) {
						this.bullets[i].isDestroyed = true;
						this.enemies[j].isDestroyed = true;
					}
				}

				if (!this.bullets[i].isUpdated) {
					this.bullets[i].update();
				}

				if (this.bullets[i].isDestroyed) {
					this.bullets.splice(i, 1)[0].destroy();
				}
			}

			for (var i = this.enemies.length - 1; i >= 0; i--) {
				if (!this.enemies[i].isUpdated) {
					this.enemies[i].update();
				}

				if (this.enemies[i].isDestroyed) {
					this.enemies.splice(i, 1)[0].destroy();
				}
			}

			if (timestamp > this.lastEnemy + 2000) {
				this.enemies.push(new Enemy());
				this.lastEnemy = timestamp;
			}
		}.bind(this), GAME_SPEED);
	},
	setUpListeners: function() {
		document.getElementById('body').addEventListener('keydown', function(event) {
			if (this.keysDown.indexOf(event.keyCode) === -1) {
				this.keysDown.push(event.keyCode);
			}
		}.bind(this));

		document.getElementById('body').addEventListener('keyup', function(event) {
			var index = this.keysDown.indexOf(event.keyCode);

			if (index !== -1) {
				this.keysDown.splice(index, 1);
			}
		}.bind(this));
	},
	processKeys: function() {
		for (var i = 0; i < this.keysDown.length; i++) {
			switch (this.keysDown[i])
			{
				case LEFT_ARROW:
					this.runner.stepLeft();
					break;
				case RIGHT_ARROW:
					this.runner.stepRight();
					break;
				case SPACE:
					var timestamp = new Date().getTime();

					if (timestamp > this.lastBullet + 500)
					{
						var bullet = new Bullet(this.runner.x + (this.runner.w / 2) - (BULLET_WIDTH / 2), this.runner.y - BULLET_HEIGHT);
						this.bullets.push(bullet);
						this.lastBullet = timestamp;
					}
					break;
			}
		}
	},
	testCollision: function(firstObj, secondObj) {
		var x1 = firstObj.x;
		var w1 = firstObj.w;
		var y1 = firstObj.y;
		var h1 = firstObj.h;
		var x2 = secondObj.x;
		var w2 = secondObj.w;
		var y2 = secondObj.y;
		var h2 = secondObj.h;

		if ((x2 - w1 < x1 && x1 < x2 + w2 + w1) && (y1 < y2 + h2)) {
			return true;
		} else {
			return false;
		}
	}
};

game.init();