import {RUNNER, viewport} from './settings.js';
import MovingPiece from './MovingPiece.js';

export default class Runner extends MovingPiece {
	constructor() {
		// Create runner at bottom of game viewport
		super('runner', 0, viewport.height - RUNNER.HEIGHT, RUNNER.HEIGHT, RUNNER.WIDTH, RUNNER.COLOR, RUNNER.STEP);
	}

	stepLeft() {
		this.x -= this.step;

		if (this.x < 0) {
			this.x = 0;
		}
	}

	stepRight() {
		this.x += this.step;

		if (this.x + this.w > viewport.width) {
			this.x = viewport.width - this.w;
		}
	}
};