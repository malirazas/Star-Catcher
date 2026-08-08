# ⭐ Star Catcher

Star Catcher is a lightweight 2D arcade game built with **Phaser 3.90**.

The game puts the player in control of a small spaceship. Stars fall from the top of the screen, while asteroids appear as obstacles. The goal is to catch as many stars as possible, avoid collisions, and achieve the highest score before all lives are lost.

The project was designed around a simple gameplay loop with responsive controls for both desktop and mobile devices. The final playable is also packaged as a standalone HTML file for easy distribution.

---

## 🎮 Gameplay

The player starts each game with **5 lives**.

Stars continuously fall from the top of the screen. Catching a star awards **10 points**. Missing a star costs one life, and colliding with a falling asteroid also costs one life.

The game ends when all five lives are lost, after which the final score is shown on the Game Over screen.

### Scoring and Lives

| Action | Result |
|---|---:|
| Catch a star | **+10 points** |
| Miss a star | **-1 life** |
| Hit an asteroid | **-1 life** |

Stars and obstacles are spawned with spacing considerations so that obstacles do not unfairly overlap with collectible stars.

---

## 🕹️ Controls

### Desktop

Use the keyboard arrow keys:

- `←` Move left
- `→` Move right

Move the spaceship horizontally to collect stars while avoiding asteroids.

### 📱 Mobile

The game supports touch controls.

Touch and drag horizontally across the game screen. The spaceship follows the horizontal touch position, allowing the game to be played without a keyboard on phones and tablets.

---

## 🏆 Difficulty Levels

Star Catcher includes three difficulty levels:

- **Easy** - a slower and more relaxed experience.
- **Medium** - faster gameplay with a higher star spawn rate.
- **Hard** - the fastest and most challenging setting.

The selected difficulty changes the falling-star speed and spawn rate.

---

## 🏅 High Scores

The game keeps a separate high score for each difficulty level.

High scores are stored locally in the browser using **localStorage**, so no backend or account is required.

Separate scores are maintained for:

- Easy
- Medium
- Hard

The saved scores remain available until the browser's local storage data is cleared.

---

## 📱 Responsive Design

The game uses Phaser's responsive scaling system to adapt to different screen sizes.

It is designed to work across:

- Desktop monitors
- Laptop screens
- Tablets
- Mobile phones
- Different browser window sizes

The spaceship is kept inside the visible game area, and mobile touch controls allow the game to remain playable on smaller screens.

---

## 🛠️ Built With

- **Phaser 3.90**
- **JavaScript**
- **HTML5**
- **CSS**
- **localStorage**

Phaser handles the game's rendering, input, physics, animations, scene management, and responsive scaling.

---

## 📦 Project Structure

The repository contains the source project and the final standalone playable build.

```text
Star-Catcher/
│
├── index.html
├── package.json
├── README.md
├── .gitignore
│
├── src/
│   ├── MenuScene.js
│   ├── GameScene.js
│   ├── GameOverScene.js
│   └── ...
│
├── assets/
│   └── ...
│
└── dist/
    └── Star-Catcher-AppLovin-Single-HTML.html
```

---

## 🚀 Running the Source Project

### Prerequisites

Before running the source project, install:

- **Node.js** (LTS version recommended)
- **npm** (included with Node.js)
- A modern web browser such as Google Chrome, Microsoft Edge, or Firefox
- A code editor such as Visual Studio Code

Verify the Node.js and npm installation with:

```bash
node --version
npm --version
```

If both commands return version numbers, the required Node.js environment is available.

### 📥 Download the Project

The source project can be downloaded directly from GitHub:

1. Open the GitHub repository.
2. Select **Code**.
3. Choose **Download ZIP**.
4. Extract the downloaded ZIP file.
5. Open the extracted project folder in a code editor.
6. Open a terminal in that project folder.

### 📦 Install Dependencies

The `node_modules` directory is intentionally excluded from the repository through `.gitignore`. It contains generated dependency files and does not need to be committed to Git.

After downloading and extracting the project, run:

```bash
npm install
```

This reads the dependencies listed in `package.json` and creates the required `node_modules` directory locally.

`npm install` is required when setting up the source project for the first time, or when the project dependencies have changed.

### ▶️ Start the Development Version

Run the development command defined in `package.json`.

For example, if the project has a `start` script:

```bash
npm start
```

If the project uses a different script, check the `scripts` section of `package.json` and run the appropriate command.

Once the development server starts, open the local address provided by the server in a modern web browser.

---

## 🎮 Standalone AppLovin Playable

The final playable build is available in the `dist` folder:

```text
dist/Star-Catcher-AppLovin-Single-HTML.html
```

This is the standalone **single-file HTML build** prepared for playable distribution.

The standalone build does not require:

- Node.js
- npm
- `node_modules`
- A development server
- The original source files

The file is self-contained and can be used independently from the source project.

The final playable build is kept below the required **5 MB** file-size limit.

---

## 🖼️ Embedded Assets

The final standalone playable embeds the required game images directly into the HTML as **Base64 data**.

The embedded game assets include:

- Player spaceship
- Falling star
- Asteroid obstacle

Because these assets are embedded, the standalone playable does not depend on external image files or external asset paths.

---

## ☄️ Obstacles and Fair Gameplay

Asteroids act as falling obstacles throughout the game.

The player must avoid them while collecting stars. A collision between the spaceship and an asteroid costs one life.

The spawning logic also keeps stars and asteroids from appearing directly on top of each other, giving the player a reasonable opportunity to react and keeping the gameplay fair.

---

## 💡 Design Approach

The project focuses on a small, clear gameplay loop rather than adding features that are not necessary for the experience.

The main design decisions were:

- Lightweight 2D visuals to keep the playable small.
- Responsive Phaser scaling for different screen sizes.
- Keyboard controls for desktop gameplay.
- Touch-based horizontal movement for mobile devices.
- Local storage for per-difficulty high scores.
- Embedded Base64 assets for the standalone playable.
- Simple difficulty settings that increase the pace of the game.
- Separate source and distribution builds so development files do not need to be included in the final playable.

These choices keep the game easy to understand, quick to load, and straightforward to distribute.

---

## 🔮 Possible Future Improvements

If the project were expanded further, possible additions could include:

- Additional obstacle types
- Power-ups such as shields or temporary speed boosts
- More player and obstacle animations
- Sound effects and background music
- Additional visual effects and particles
- More gameplay modes
- Online leaderboards

These features are not part of the current version in order to keep the game focused and lightweight.

---

## 🧪 Testing

The game has been tested across desktop and mobile screen sizes.

The following areas were checked:

- Star collection and scoring
- Missed-star life reduction
- Asteroid collision and life reduction
- Game Over state
- Play Again functionality
- Difficulty selection
- Separate high scores for each difficulty
- Desktop keyboard controls
- Mobile touch controls
- Responsive resizing
- Embedded game assets
- Standalone single-file HTML build

The final version was also checked using the browser developer console during normal gameplay.

---

## 📋 Submission

The repository includes both the complete source project and the final standalone playable build.

### Source Project

Download the repository as a ZIP from GitHub, extract it, and install the dependencies with:

```bash
npm install
```

Then run the development command defined in `package.json`.

### AppLovin Playable

The final standalone build is located at:

```text
dist/Star-Catcher-AppLovin.html
```

The standalone HTML file contains the embedded game assets and does not require the source project or `node_modules` to run.

---

## 👨‍💻 Project Notes

Star Catcher was built with a focus on a clean and lightweight arcade experience.

The final version combines falling stars, asteroid obstacles, five lives, difficulty levels, per-difficulty high scores, desktop keyboard controls, mobile touch controls, responsive scaling, embedded assets, and a standalone single-file HTML build.
