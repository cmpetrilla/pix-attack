function Enemy(x, y, h, w) {
	if (!(this instanceof Enemy))
	{
		return new Enemy(x, y, h, w);
	}

	var timestamp = new Date().getTime();
	var randomXPosition = Math.random() * (GAME_WIDTH - WINDOW_BUFFER - ENEMY_WIDTH) + WINDOW_BUFFER;

	MovingObject.call(this, 'enemy' + timestamp, randomXPosition, WINDOW_BUFFER, ENEMY_HEIGHT, ENEMY_WIDTH, ENEMY_COLOR, ENEMY_STEP);

	this.startMoving();
}

Enemy.prototype = Object.create(MovingObject.prototype);

Enemy.prototype.startMoving = function() {
	setInterval(function()
	{
		this.y += this.step;
		this.isUpdated = false;

		if (this.y > GAME_HEIGHT - WINDOW_BUFFER)
		{
			// game over
		}
	}.bind(this), ENEMY_SPEED);
};