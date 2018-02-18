import constants from './constants.js';
import MovingObject from './MovingObject.js';

export default class Bullet extends MovingObject {
	constructor(x, y) {
		super('bullet', x, y, constants.BULLET.HEIGHT, constants.BULLET.WIDTH, constants.BULLET.COLOR, constants.BULLET.STEP);
	}

	update() {
		if (this.y < 0) {
			this.doDestroy = true;
		} else {
			this.y -= this.step;
			super.update();
		}
	}
}