import constants from './constants.js';
import MovingObject from './moving-object.js';

export default class Bullet extends MovingObject {
	constructor(x, y, h, w) {
		let timestamp = new Date().getTime();

		super('bullet' + timestamp, x, y, constants.BULLET.HEIGHT, constants.BULLET.WIDTH, constants.BULLET.COLOR, constants.BULLET.STEP);

		this.fire();
	}

	fire() {
		setInterval(function() {
			this.y -= this.step;
			this.doUpdate = true;

			if (this.y < 0) {
				this.doDestroy = true;
			}
		}.bind(this), constants.BULLET.SPEED);
	}
}