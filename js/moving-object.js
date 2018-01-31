import constants from './constants.js';
import GameObject from './game-object.js';

export default class MovingObject extends GameObject {
	constructor(id, x, y, h, w, color, step) {
		super(id, x, y, h, w, color);

		this.step = step;
		this.isDestroyed = false;
		this.doUpdate = false;
	}

	update() {
		this.domElement.setAttribute('x', this.x);
		this.domElement.setAttribute('y', this.y);
		this.doUpdate = false;
	}

	destroy() {
		constants.ROOT_ELEMENT.removeChild(this.domElement);
		this.doDestroy = true;
		this.doUpdate = false;
	}
};