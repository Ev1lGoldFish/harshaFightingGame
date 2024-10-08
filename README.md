# Vs Game

This is a simple HTML Canvas 2D fighting game. 
This game can be played by two players with simple controls to move, jump, and attack.
https://vs-fighting-game.vercel.app/

The game is designed using object oriented programming using JavaScript.
### Challenges Handled:
- **Animation Control**: Ensures that animations play correctly and only when appropriate (e.g., can’t switch out of a death animation or interrupt an attack animation).
- **Gravity Simulation**: Ensures that characters fall to the ground and stop when they reach the floor level.
- **State Management**: Ensures that fighters' actions are visually represented accurately by switching between the appropriate sprites.
- **Collision Detection**: The rectangularCollision function is an efficient way to detect overlap between two objects in 2D space, which is essential for determining when an attack hits an opponent.
- **Match End Logic**: The matchResult function ensures the game properly handles different outcomes based on player health, allowing for a clean end to the game with a visible display.
- **Timer Management**: The decreaseTimer function handles the game’s time limit, ensuring that the game ends after a certain period, whether by timeout or determining a winner based on health.
