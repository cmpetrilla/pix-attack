# Pix Attack
Pix Attack is a simple shooter game, where you move left and right and fire bullets at the enemies.

It's written in Javascript, HTML, and CSS, and it uses SVG elements for the viewport.

My goal was not to build a highly compelling game, but to understand basic game development and to work with ES6 classes and modules.

## Classes
Pix Attack uses the following classes. Descriptions of each are also provided.

### `Game`
* Initializes the game, starts the main loop, and handles input controls
* Generates new enemies and bullets as needed
* Detects collisions between bullets and enemies
* Tracks, updates, and removes game pieces
* Tracks and updates score

### `MovingPiece`
* Superclass of `Runner`, `Bullet`, and `Enemy` classes
* Creates a new moving piece, based on provided attributes (position, color, etc.)
* Renders new objects to the DOM
* Flags destroyed game pieces
* Updates x and y attributes for moving pieces, which updates the DOM

### `Runner`
* Creates the runner object that the player controls
* Exposes methods to move left and right

### `Bullet`
* Creates new bullet, based on runner's position
* Extends the `update` function of `MovingPiece` to make the element move on the screen

### `Enemy`
* Randomy creates a new enemy on the x-axis
* Extends the `update` function of `MovingPiece` similar to `Bullet`

## Settings
A separate settings file specifies the game constants (e.g., runner, bullet, and enemy attributes) and viewport attributes and tracks all moving game pieces, lives, and the score.
