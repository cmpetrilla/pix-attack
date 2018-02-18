import constants from './constants.js';
import Runner from './RunnerMovingObject.js';
import Enemy from './EnemyMovingObject.js';
import Bullet from './BulletMovingObject.js';

export default class Game  {
	constructor() {
		let y = constants.ROOT_ELEMENT.clientHeight - constants.RUNNER.HEIGHT;

		this.runner = new Runner(y);
		this.bullets = [];
		this.enemies = [];
		this.keysDown = [];
		this.lastBullet = 0;
		this.lastEnemy = 0;

		this.setUpListeners();

		setInterval(this.draw.bind(this), constants.GAME.SPEED);
	};

	draw() {
		let timestamp = new Date().getTime();

		this.processKeys();

		this.updateMovingObjects();

		this.testCollisions();

		this.removeDestroyedObjects();

		if (timestamp > this.lastEnemy + 2000) {
			this.enemies.push(new Enemy());
			this.lastEnemy = timestamp;
		}
	};

	testCollisions() {
		for (let enemy of this.enemies) {
			for (let bullet of this.bullets) {
				if (this.testCollision(bullet, enemy)) {
					bullet.destroy();
					enemy.destroy();
				}
			}
		}
	}

	removeDestroyedObjects() {
		for (let i = this.bullets.length - 1; i >= 0; i--) {
			if (this.bullets[i].destroyed) {
				this.bullets.splice(i, 1);
			}
		}

		for (let i = this.enemies.length - 1; i >= 0; i--) {
			if (this.enemies[i].destroyed) {
				this.enemies.splice(i, 1);
			}
		}
	}

	updateMovingObjects() {
		// this.runner.update();

		for (let enemy of this.enemies) {
			enemy.update();
		}

		for (let bullet of this.bullets) {
			bullet.update();
		}
	};

	setUpListeners() {
		document.addEventListener('keydown', (event) => {
			if (this.keysDown.indexOf(event.keyCode) === -1) {
				this.keysDown.push(event.keyCode);
			}
		});

		document.addEventListener('keyup', (event) => {
			let index = this.keysDown.indexOf(event.keyCode);

			if (index !== -1) {
				this.keysDown.splice(index, 1);
			}
		});
	};

	processKeys() {
		for (let i = 0; i < this.keysDown.length; i++) {
			switch (this.keysDown[i]) {
				case constants.INPUTS.LEFT_ARROW:
					this.runner.stepLeft();
					break;
				case constants.INPUTS.RIGHT_ARROW:
					this.runner.stepRight();
					break;
				case constants.INPUTS.SPACE:
					let timestamp = new Date().getTime();

					if (timestamp > this.lastBullet + 500) {
						let bullet = new Bullet(this.runner.x + (this.runner.w / 2) - (constants.BULLET.WIDTH / 2), this.runner.y - constants.BULLET.HEIGHT);
						this.bullets.push(bullet);
						this.lastBullet = timestamp;
					}
					break;
			}
		}
	};

	testCollision(obj1, obj2) {
		let x1 = obj1.x;
		let w1 = obj1.w;
		let y1 = obj1.y;
		let h1 = obj1.h;
		let x2 = obj2.x;
		let w2 = obj2.w;
		let y2 = obj2.y;
		let h2 = obj2.h;

		return (x2 - w1 < x1 && x1 < x2 + w2 + w1) && (y1 < y2 + h2);
	};
}