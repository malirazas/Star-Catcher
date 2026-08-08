# ⭐ Star Catcher

Star Catcher is a small 2D arcade game built with Phaser 3.90.

The idea is simple: control a spaceship, catch the falling stars, and try to get the highest score possible before all six lives are lost.

I kept the game intentionally lightweight and focused on a clean gameplay loop rather than adding unnecessary features. The project was also built with responsive screens and mobile controls in mind, so the game can be played on both desktop and mobile devices.

---

## 🎮 Game Overview

In Star Catcher, the player controls a spaceship positioned near the bottom of the screen.

Stars continuously fall from the top of the screen. The goal is to move the spaceship underneath them and catch as many as possible.

Every successfully caught star gives:

**+10 points**

Missing a star costs one life.

The player starts with:

**❤️ 6 Lives**

Once all lives are lost, the game ends and the final score is displayed.

---

## 🕹️ How to Play

### Desktop

Use the keyboard arrow keys:

- `←` Move left
- `→` Move right

Move the spaceship underneath the falling stars to catch them.

### Mobile

The game supports touch interaction.

On a touch device, drag the spaceship horizontally across the screen to move it.

This was added so the game does not depend on keyboard controls when played on a phone or tablet.

---

## 🎯 Objective

The objective is to catch as many falling stars as possible and achieve the highest score before losing all six lives.

Each star caught:

```text
+10 Score