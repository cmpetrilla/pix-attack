import settings from './settings.js';
import MovingObject from './MovingObject.js';

export default class Bullet extends MovingObject {
	constructor(x, y) {
		super('bullet', x, y, settings.BULLET.HEIGHT, settings.BULLET.WIDTH, settings.BULLET.COLOR, settings.BULLET.STEP);
	}

	update() {
		if (this.y < 0) {
			this.destroy();
		} else {
			this.y -= this.step;
			super.update();
		}
	}
}