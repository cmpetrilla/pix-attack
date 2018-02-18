import settings from './settings.js';
import MovingObject from './MovingObject.js';

export default class Enemy extends MovingObject {
	constructor() {
		let randomXPosition = Math.random() * (settings.GAME.WIDTH  - settings.ENEMY.WIDTH);

		super('enemy', randomXPosition, 0, settings.ENEMY.HEIGHT, settings.ENEMY.WIDTH, settings.ENEMY.COLOR, settings.ENEMY.STEP);
	}

	update() {
		if (this.y >= settings.GAME.HEIGHT) {
			// game over
			this.destroy();
		} else {
			this.y += this.step;
			super.update();
		}
	}
};