# ⭐ Star Catcher

Star Catcher is a lightweight 2D arcade game built with **Phaser 3.90**.

The goal is simple: control a spaceship, catch falling stars, avoid incoming asteroids, and achieve the highest score possible before losing all of your lives.

The game was designed with a simple and responsive gameplay loop so it can be played comfortably on both desktop and mobile devices. The project also focuses on keeping the final playable lightweight and suitable for HTML5 playable ad requirements.

---

## 🎮 Game Overview

In Star Catcher, the player controls a spaceship near the bottom of the screen.

Stars continuously fall from the top of the screen. The player needs to move the spaceship underneath the stars and catch them to increase the score.

At the same time, **asteroids** fall from above as obstacles. Colliding with an asteroid costs one life, so the player needs to balance catching stars with avoiding obstacles.

The player starts with:

**❤️ 5 Lives**

The game ends when all five lives are lost.

---

## 🎯 Objective

The main objective is to:

- Catch as many stars as possible.
- Avoid falling asteroids.
- Keep your lives for as long as possible.
- Achieve the highest possible score.

### ⭐ Catching a Star

Every successfully caught star gives:

```text
+10 Points
⭐ Missing a Star

If a falling star reaches the bottom of the screen without being caught:

-1 Life
☄️ Asteroid Collision

If the spaceship collides with a falling asteroid:

-1 Life

When all 5 lives are lost, the game enters the Game Over state.

🕹️ Controls
Desktop

Use the keyboard arrow keys to control the spaceship:

←  Move Left
→  Move Right

Move the spaceship horizontally underneath falling stars to catch them.

Avoid the falling asteroids because each collision costs one life.

📱 Mobile

The game supports touch controls for mobile devices.

To move the spaceship:

Touch the game screen.
Drag your finger horizontally.
The spaceship follows your horizontal touch position.
Release your finger when you want to stop moving.

This allows the game to be played without a keyboard on phones and tablets.

🏆 Difficulty Levels

Star Catcher includes three difficulty levels:

🟢 Easy

A slower and more relaxed gameplay experience.

🟡 Medium

Stars fall faster and appear more frequently.

🔴 Hard

A faster-paced challenge designed for players who want a more difficult gameplay experience.

The selected difficulty affects the falling-star speed and spawn rate.

🏅 High Score

Star Catcher keeps track of the player's high score for each difficulty level.

High scores are stored locally using browser LocalStorage.

This means the player can have separate high scores for:

Easy
Medium
Hard

The scores remain available when the player starts another game on the same browser, as long as the browser's local storage data is not cleared.

📱 Responsive Design

The game uses Phaser's responsive scaling system to adapt to different screen sizes.

It is designed to work across:

Desktop monitors
Laptop screens
Mobile phones
Tablets
Different browser window sizes

The game also keeps the spaceship inside the visible game area during movement.

Mobile touch controls are provided so gameplay does not depend on keyboard input.

🛠️ Technologies Used
Phaser 3.90
JavaScript
HTML5
CSS
LocalStorage

Phaser is used for the game engine, rendering, input handling, physics, animations, and scene management.
