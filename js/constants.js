const ROOT_ELEMENT = document.getElementById('gameRoot');
const GAME_VIEWPORT_ELEMENT = ROOT_ELEMENT.getBoundingClientRect();

export default {
	ROOT_ELEMENT,
	GAME: {
		WIDTH: GAME_VIEWPORT_ELEMENT.width,
		HEIGHT: GAME_VIEWPORT_ELEMENT.height,
		SPEED: 60
	},
	INPUTS: {
		LEFT_ARROW: 37,
		RIGHT_ARROW: 39,
		SPACE: 32
	},
	RUNNER: {
		WIDTH: 40,
		HEIGHT: 20,
		STEP: 20,
		COLOR: '#eed113'
	},
	BULLET: {
		WIDTH: 6,
		HEIGHT: 15,
		STEP: 10,
		COLOR: '#acacac'
	},
	ENEMY: {
		WIDTH: 20,
		HEIGHT: 20,
		COLOR: '#d2151c',
		STEP: 10
	}
};