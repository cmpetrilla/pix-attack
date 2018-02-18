import settings from './settings.js';
import Runner from './Runner.js';
import Enemy from './Enemy.js';
import Bullet from './Bullet.js';

export default class Game  {
	constructor(gameRoot) {
		// Update game settings
		let boundingClientRect = gameRoot.getBoundingClientRect();
		settings.ROOT_ELEMENT = gameRoot;
		settings.GAME.HEIGHT = boundingClientRect.height;
		settings.GAME.WIDTH = boundingClientRect.width;

		this.runner = new Runner();
		this.bullets = [];
		this.enemies = [];
		this.keysDown = [];
		this.lastBullet = 0;
		this.lastEnemy = 0;
		this.timestamp = 0;

		this.setUpListeners();

		setInterval(this.draw.bind(this), settings.GAME.SPEED);
	};

	draw() {
		this.timestamp = new Date().getTime();

		this.processKeys();

		this.updateMovingObjects();

		this.testCollisions();

		this.removeDestroyedObjects();

		if (this.timestamp > this.lastEnemy + 2000) {
			this.enemies.push(new Enemy());
			this.lastEnemy = this.timestamp;
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
				case settings.INPUTS.LEFT_ARROW:
					this.runner.stepLeft();
					break;
				case settings.INPUTS.RIGHT_ARROW:
					this.runner.stepRight();
					break;
				case settings.INPUTS.SPACE:
					if (this.timestamp > this.lastBullet + 500) {
						let bullet = new Bullet(this.runner.x + (this.runner.w / 2) - (settings.BULLET.WIDTH / 2), this.runner.y - settings.BULLET.HEIGHT);
						this.bullets.push(bullet);
						this.lastBullet = this.timestamp;
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