import constants from './constants.js';
import MovingObject from './MovingObject.js';

export default class Bullet extends MovingObject {
	constructor(x, y) {
		super(x, y, constants.BULLET.HEIGHT, constants.BULLET.WIDTH, constants.BULLET.COLOR, constants.BULLET.STEP);

		this.fire();
	}

	fire() {
		setInterval(() => {
			this.y -= this.step;
			this.doUpdate = true;

			if (this.y < 0) {
				this.doDestroy = true;
			}
		}, constants.BULLET.SPEED);
	}
}