import {viewport} from './settings.js';

export default class MovingObject {
	constructor(type, x, y, h, w, color, step) {
		this.x = x;
		this.y = y;
		this.h = h;
		this.w = w;
		this.color = color;
		this.step = step;
		this.id = type + new Date().getTime();
		this.destroyed = false;

		this.render();
	}

	render() {
		let svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

		svgNode.setAttribute('x', this.x);
		svgNode.setAttribute('y', this.y);
		svgNode.setAttribute('width', this.w);
		svgNode.setAttribute('height', this.h);
		svgNode.setAttribute('fill', this.color);
		svgNode.setAttribute('id', this.id);

		viewport.domElement.appendChild(svgNode);

		this.domElement = document.getElementById(this.id);
	}

	update() {
		this.domElement.setAttribute('x', this.x);
		this.domElement.setAttribute('y', this.y);
	}

	destroy() {
		this.domElement.remove();
		this.destroyed = true;
	}
};