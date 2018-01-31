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

		this.mainloop();
	};

	mainloop() {
		setInterval(() => {
			let timestamp = new Date().getTime();

			this.processKeys();

			if (this.runner.doUpdate) {
				this.runner.update();
			}

			// test collisions
			for (let i = this.bullets.length - 1; i >= 0; i--) {
				for (let j = this.enemies.length - 1; j >= 0; j--) {
					if (this.testCollision(this.bullets[i], this.enemies[j])) {
						this.bullets[i].doDestroy = true;
						this.enemies[j].doDestroy = true;
					}
				}

				if (this.bullets[i].doUpdate) {
					this.bullets[i].update();
				}

				if (this.bullets[i].doDestroy) {
					this.bullets.splice(i, 1)[0].destroy();
				}
			}

			for (let i = this.enemies.length - 1; i >= 0; i--) {
				if (this.enemies[i].doUpdate) {
					this.enemies[i].update();
				}

				if (this.enemies[i].doDestroy) {
					this.enemies.splice(i, 1)[0].destroy();
				}
			}

			if (timestamp > this.lastEnemy + 2000) {
				this.enemies.push(new Enemy());
				this.lastEnemy = timestamp;
			}
		}, constants.GAME.SPEED);
	};

	setUpListeners() {
		document.getElementById('body').addEventListener('keydown', function(event) {
			if (this.keysDown.indexOf(event.keyCode) === -1) {
				this.keysDown.push(event.keyCode);
			}
		}.bind(this));

		document.getElementById('body').addEventListener('keyup', function(event) {
			let index = this.keysDown.indexOf(event.keyCode);

			if (index !== -1) {
				this.keysDown.splice(index, 1);
			}
		}.bind(this));
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