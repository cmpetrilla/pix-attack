function Runner(x, y, h, w) {
	if (!(this instanceof Runner))
	{
		return new Runner(x, y, h, w);
	}

	var timestamp = new Date().getTime();

	MovingObject.call(this, 'runner' + timestamp, x, y, RUNNER_HEIGHT, RUNNER_WIDTH, RUNNER_COLOR, RUNNER_STEP);
}

Runner.prototype = Object.create(MovingObject.prototype);

Runner.prototype.stepLeft = function() {
	this.x -= this.step;

	if (this.x < WINDOW_BUFFER) {
		this.x = WINDOW_BUFFER;
	}

	this.isUpdated = false;
};

Runner.prototype.stepRight = function() {
	this.x += this.step;

	if (this.x + this.w > GAME_WIDTH - WINDOW_BUFFER) {
		this.x = GAME_WIDTH - WINDOW_BUFFER - this.w;
	}
	
	this.isUpdated = false;
};