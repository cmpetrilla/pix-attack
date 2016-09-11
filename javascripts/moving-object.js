function MovingObject(id, x, y, h, w, color, step) {
	if (!(this instanceof MovingObject))
	{
		return new MovingObject(id, x, y, h, w, color, step);
	}

	GameObj.call(this, id, x, y, h, w, color);

	this.step = step;
	this.isDestroyed = false;
	this.isUpdated = true;
}

MovingObject.prototype = Object.create(GameObj.prototype);

MovingObject.prototype.update = function() {
	this.domElement.setAttribute('x', this.x);
	this.domElement.setAttribute('y', this.y);
	this.isUpdated = true;
};

MovingObject.prototype.destroy = function() {
	ROOT_DOM_NODE.removeChild(this.domElement);
	this.isDestroyed = true;
	this.isUpdated = true;
}