import gamePieces from './gamePieces.js';
import settings from './settings.js';
import MovingObject from './MovingObject.js';

export default class Bullet extends MovingObject {
	constructor() {
		super('bullet', gamePieces.runner.x + (gamePieces.runner.w / 2) - (settings.BULLET.WIDTH / 2), gamePieces.runner.y - settings.BULLET.HEIGHT, settings.BULLET.HEIGHT, settings.BULLET.WIDTH, settings.BULLET.COLOR, settings.BULLET.STEP);
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