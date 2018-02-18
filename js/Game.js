import settings from './settings.js';
import gamePieces from './gamePieces.js';
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

		gamePieces.runner = new Runner();

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
			gamePieces.enemies.push(new Enemy());
			this.lastEnemy = this.timestamp;
		}
	};

	testCollisions() {
		for (let enemy of gamePieces.enemies) {
			for (let bullet of gamePieces.bullets) {
				if (this.testCollision(bullet, enemy)) {
					bullet.destroy();
					enemy.destroy();
				}
			}
		}
	}

	removeDestroyedObjects() {
		for (let i = gamePieces.bullets.length - 1; i >= 0; i--) {
			if (gamePieces.bullets[i].destroyed) {
				gamePieces.bullets.splice(i, 1);
			}
		}

		for (let i = gamePieces.enemies.length - 1; i >= 0; i--) {
			if (gamePieces.enemies[i].destroyed) {
				gamePieces.enemies.splice(i, 1);
			}
		}
	}

	updateMovingObjects() {
		for (let enemy of gamePieces.enemies) {
			enemy.update();
		}

		for (let bullet of gamePieces.bullets) {
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
					gamePieces.runner.stepLeft();
					break;
				case settings.INPUTS.RIGHT_ARROW:
					gamePieces.runner.stepRight();
					break;
				case settings.INPUTS.SPACE:
					if (this.timestamp > this.lastBullet + 500) {
						gamePieces.bullets.push(new Bullet());
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