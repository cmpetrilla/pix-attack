function Bullet(x, y, h, w) {
	if (!(this instanceof Bullet))
	{
		return new Bullet(x, y, h, w);
	}

	var timestamp = new Date().getTime();

	MovingObject.call(this, 'bullet' + timestamp, x, y, BULLET_HEIGHT, BULLET_WIDTH, BULLET_COLOR, BULLET_STEP);

	this.fire();
}

Bullet.prototype = Object.create(MovingObject.prototype);

Bullet.prototype.fire = function() {
	setInterval(function()
	{
		this.y -= this.step;
		this.isUpdated = false;

		if (this.y < WINDOW_BUFFER)
		{
			this.isDestroyed = true;
		}
	}.bind(this), BULLET_SPEED);
};