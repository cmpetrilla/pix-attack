import constants from './constants.js';
import MovingObject from './MovingObject.js';

export default class Enemy extends MovingObject {
	constructor() {
		let timestamp = new Date().getTime();
		let randomXPosition = Math.random() * (constants.GAME.WIDTH  - constants.ENEMY.WIDTH);

		super('enemy' + timestamp, randomXPosition, 0, constants.ENEMY.HEIGHT, constants.ENEMY.WIDTH, constants.ENEMY.COLOR, constants.ENEMY.STEP);

		this.startMoving();
	}

	startMoving() {
		setInterval(function() {
			this.y += this.step;
			this.doUpdate = true;

			if (this.y > constants.GAME.HEIGHT)
			{
				// game over
				// this.destroy();
			}
		}.bind(this), constants.ENEMY.SPEED);
	}
};