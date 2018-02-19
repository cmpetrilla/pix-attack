import {SPEED, INPUTS, POINTS_PER_ENEMY, viewport, movingPieces, lives, score} from './settings.js';
import Runner from './Runner.js';
import Enemy from './Enemy.js';
import Bullet from './Bullet.js';

export default class Game  {
	constructor(gameNode, livesNode, scoreNode) {
		// Initialize game settings
		let boundingClientRect = gameNode.getBoundingClientRect();
		viewport.domElement = gameNode;
		viewport.height = boundingClientRect.height;
		viewport.width = boundingClientRect.width;
		lives.domElement = livesNode;
		score.domElement = scoreNode;
		movingPieces.runner = new Runner();

		this.keysDown = [];
		this.lastBullet = 0;
		this.lastEnemy = 0;
		this.timestamp = 0;

		this.setUpListeners();

		this.gameLoop = setInterval(() => this.draw(), SPEED);
	}

	draw() {
		if (lives.value > 0) {
			this.timestamp = new Date().getTime();

			this.processKeys();

			this.updateMovingPieces();

			this.testCollisions();

			this.removeDestroyedMovingPieces();

			this.updateScore();

			this.updateLives();

			if (this.timestamp > this.lastEnemy + 2000) {
				movingPieces.enemies.push(new Enemy());
				this.lastEnemy = this.timestamp;
			}
		} else {
			clearInterval(this.gameLoop);
		}
	}

	updateScore() {
		score.domElement.innerText = score.value;
	}

	updateLives() {
		lives.domElement.innerText = lives.value;
	}

	testCollisions() {
		// Iterate all enemies and bullets, check for collisions, and increment score when found
		for (let enemy of movingPieces.enemies) {
			for (let bullet of movingPieces.bullets) {
				if (this.testCollision(bullet, enemy)) {
					bullet.destroy();
					enemy.destroy();
					score.value += POINTS_PER_ENEMY;
				}
			}
		}
	}

	removeDestroyedMovingPieces() {
		// Iterate in reverse, so destroyed pieces can be removed easily
		for (let i = movingPieces.bullets.length - 1; i >= 0; i--) {
			if (movingPieces.bullets[i].destroyed) {
				movingPieces.bullets.splice(i, 1);
			}
		}

		for (let i = movingPieces.enemies.length - 1; i >= 0; i--) {
			if (movingPieces.enemies[i].destroyed) {
				movingPieces.enemies.splice(i, 1);
			}
		}
	}

	updateMovingPieces() {
		movingPieces.runner.update();

		for (let enemy of movingPieces.enemies) {
			enemy.update();
		}

		for (let bullet of movingPieces.bullets) {
			bullet.update();
		}
	}

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
	}

	processKeys() {
		for (let i = 0; i < this.keysDown.length; i++) {
			switch (this.keysDown[i]) {
				case INPUTS.LEFT_ARROW:
					movingPieces.runner.stepLeft();
					break;
				case INPUTS.RIGHT_ARROW:
					movingPieces.runner.stepRight();
					break;
				case INPUTS.SPACE:
					if (this.timestamp > this.lastBullet + 500) {
						movingPieces.bullets.push(new Bullet());
						this.lastBullet = this.timestamp;
					}
					break;
			}
		}
	}

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
	}
};