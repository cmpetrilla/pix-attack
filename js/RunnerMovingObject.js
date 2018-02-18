import constants from './constants.js';
import MovingObject from './MovingObject.js';

export default class Runner extends MovingObject {
	constructor(y) {
		super(0, y, constants.RUNNER.HEIGHT, constants.RUNNER.WIDTH, constants.RUNNER.COLOR, constants.RUNNER.STEP);
	}

	stepLeft() {
		this.x -= this.step;

		if (this.x < 0) {
			this.x = 0;
		}

		super.update();
	}

	stepRight() {
		this.x += this.step;

		if (this.x + this.w > constants.GAME.WIDTH) {
			this.x = constants.GAME.WIDTH - this.w;
		}

		super.update();
	}
}