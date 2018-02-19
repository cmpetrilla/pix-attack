import {ENEMY, viewport, lives} from './settings.js';
import MovingPiece from './MovingPiece.js';

export default class Enemy extends MovingPiece {
	constructor() {
		// Generate enemy at random x position
		let randomXPosition = Math.random() * (viewport.width  - ENEMY.WIDTH);

		super('enemy', randomXPosition, 0, ENEMY.HEIGHT, ENEMY.WIDTH, ENEMY.COLOR, ENEMY.STEP);
	}

	update() {
		if (this.y >= viewport.height) {
			// game over
			this.destroy();
			lives.value--;
		} else {
			this.y += this.step;
			super.update();
		}
	}
};