# harshaFightingGame

This is a simple HTML Canvas 2D fighting game. 
This game can be played by two players with simple controls to move, jump, and attack.

The game is designed using object oriented programming with two classes, Sprite and Fighter, that are used to create and animate the characters within the HTML5 canvas-based environment.
The **Sprite** class is the base class responsible for rendering and animating images on the canvas. It has the following methods:
- **Constructor**: Takes in several properties like position, imageSrc, scale, framesMax, and an offset to fine-tune positioning. It initializes the sprite's basic properties like position, height, width, image source, and animation frames.
- **draw**: This method draws the image of the sprite onto the canvas, using drawImage(). It handles animations by drawing only a portion of the image based on framesCurrent, allowing for sprite sheet animation.
- **animateFrames**: Manages frame transitions for sprite animation. It updates the current frame after a set number of updates. Once the animation reaches the last frame, it resets to the first frame.
- **update**: Calls draw() and animateFrames() to update the sprite’s appearance every frame.

The **Fighter** class extends Sprite and adds extra functionality specific to a fighting character in the game. It handles character movement, attacks, health, and additional sprite animations.
- **Constructor**: Inherits from Sprite and adds properties like velocity for movement, health, attackBox (defines the area in which the fighter can attack), and additional sprite animations for different actions. The sprites parameter is used to store different images for the fighter's various states.
- **update**: Updates the fighter's position by applying velocity and gravity. It also updates the attack box's position based on the fighter's current position.
- **attack**: Initiates an attack by switching the sprite to the attack animation.
- **damage**: Reduces the fighter's health when they take damage, and if health drops to 0, it switches the sprite to the death animation.
- **switchSprite**: Handles changing the fighter's sprite based on the current action. It ensures that animations like attack, damage, or death take priority over other animations.

## Game Setup

**Gravity**:
A gravity constant is defined to simulate natural movement (like falling), which is applied to the player and enemy characters when they are in the air.

**Sprites and Background**:
Several sprites are created for the background and additional objects. These are rendered as static images or animations using the Sprite class.
The player and enemy characters are instances of the Fighter class, which extends the Sprite class with additional functionality, like health, movement, attack boxes, and animations.

**Player and Enemy Characters**:
The player and enemy are defined as Fighter objects. Each has several properties:
Position: Determines the character’s location on the canvas.
Velocity: Controls movement and is affected by gravity.
Offset: Fine-tunes positioning of the image on the canvas.
Sprites: Includes various images for different animations .
AttackBox: Represents the area where the character can cause damage when attacking.

**Animation Loop**:
The animate function is continuously called using window.requestAnimationFrame(), which creates the game loop.
This function clears the canvas, updates the background and sprites, and handles character movement and actions.
Character movement is based on the velocity and keypresses. The sprite animation is managed depending on the character’s state (idle, run, jump, fall, attack).

**Collision Detection**:
Collision detection between the player's and enemy's attack boxes is handled. If a collision is detected, and the attacking character is in the correct animation frame, the other character takes damage.
After a successful hit, the health of the affected character is updated visually using gsap.to() to animate the health bar width.

**Health System**:
Both the player and enemy have a health system. Health is displayed as a percentage and is reduced when they are hit by the other character's attack.
The health bars are manipulated using the gsap.to() animation library, which dynamically reduces their width based on the remaining health.

**Game End**:
The game ends when either the player's or enemy's health reaches zero. When this happens, the matchResult() function is called to display the outcome.

### Challenges Handled:
- **Animation Control**: Ensures that animations play correctly and only when appropriate (e.g., can’t switch out of a death animation or interrupt an attack animation).
- **Gravity Simulation**: Ensures that characters fall to the ground and stop when they reach the floor level.
- **State Management**: Ensures that fighters' actions are visually represented accurately by switching between the appropriate sprites.
- **Collision Detection**: The rectangularCollision function is an efficient way to detect overlap between two objects in 2D space, which is essential for determining when an attack hits an opponent.
- **Match End Logic**: The matchResult function ensures the game properly handles different outcomes based on player health, allowing for a clean end to the game with a visible display.
- **Timer Management**: The decreaseTimer function handles the game’s time limit, ensuring that the game ends after a certain period, whether by timeout or determining a winner based on health.
