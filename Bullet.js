import {BULLET, gamePieces} from './settings.js';
import MovingObject from './MovingObject.js';

export default class Bullet extends MovingObject {
	constructor() {
		// Generate bullet in middle of runner's current position
		super('bullet', gamePieces.runner.x + (gamePieces.runner.w / 2) - (BULLET.WIDTH / 2), gamePieces.runner.y - BULLET.HEIGHT, BULLET.HEIGHT, BULLET.WIDTH, BULLET.COLOR, BULLET.STEP);
	}

	update() {
		if (this.y < 0) {
			this.destroy();
		} else {
			this.y -= this.step;
			super.update();
		}
	}
};