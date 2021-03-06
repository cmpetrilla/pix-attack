export const SPEED = 60;

export const POINTS_PER_ENEMY = 100;

export const INPUTS = Object.freeze({
	LEFT_ARROW: 37,
	RIGHT_ARROW: 39,
	SPACE: 32
});

export const RUNNER = Object.freeze({
	WIDTH: 40,
	HEIGHT: 20,
	STEP: 20,
	COLOR: '#eed113'
});

export const BULLET = Object.freeze({
	WIDTH: 6,
	HEIGHT: 15,
	STEP: 10,
	COLOR: '#acacac'
});

export const ENEMY = Object.freeze({
	WIDTH: 20,
	HEIGHT: 20,
	COLOR: '#d2151c',
	STEP: 10
});

// Set these when initializing the game
export let viewport = {
	domElement: {},
	width: 0,
	height: 0
};

export let movingPieces = {
	runner: {},
	enemies: [],
	bullets: []
};

export let lives = {
	domElement: {},
	value: 3
};

export let score = {
	domElement: {},
	value: 0
};