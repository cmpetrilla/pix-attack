import settings from './settings.js';
import MovingObject from './MovingObject.js';

export default class Runner extends MovingObject {
	constructor() {
		super('runner', 0, settings.GAME.HEIGHT - settings.RUNNER.HEIGHT, settings.RUNNER.HEIGHT, settings.RUNNER.WIDTH, settings.RUNNER.COLOR, settings.RUNNER.STEP);
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

		if (this.x + this.w > settings.GAME.WIDTH) {
			this.x = settings.GAME.WIDTH - this.w;
		}

		super.update();
	}
}