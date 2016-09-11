function GameObj(id, x, y, h, w, fillColor) {
	if (!(this instanceof GameObj))
	{
		return new GameObj(id, x, y, h, w, fillColor);
	}

	this.id = id;
	this.x = x;
	this.y = y;
	this.h = h;
	this.w = w;
	this.fillColor = fillColor;

	this.render();
}

GameObj.prototype.render = function() {
	var svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	svgNode.setAttribute('x', this.x);
	svgNode.setAttribute('y', this.y);
	svgNode.setAttribute('width', this.w);
	svgNode.setAttribute('height', this.h);
	svgNode.setAttribute('fill', this.fillColor);
	svgNode.setAttribute('id', this.id);

	ROOT_DOM_NODE.appendChild(svgNode);

	this.domElement = document.getElementById(this.id);
};