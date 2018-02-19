import {BULLET, movingPieces} from './settings.js';
import MovingPiece from './MovingPiece.js';

export default class Bullet extends MovingPiece {
	constructor() {
		// Generate bullet in middle of runner's current position
		super('bullet', movingPieces.runner.x + (movingPieces.runner.w / 2) - (BULLET.WIDTH / 2), movingPieces.runner.y - BULLET.HEIGHT, BULLET.HEIGHT, BULLET.WIDTH, BULLET.COLOR, BULLET.STEP);
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