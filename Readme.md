# ⭐ Star Catcher

Star Catcher is a lightweight 2D arcade game built with **Phaser 3.90**.

The game puts the player in control of a small spaceship. Stars fall from the top of the screen, and the goal is to catch as many as possible while avoiding falling asteroids. Every caught star increases the score, while missing a star or colliding with an asteroid costs a life.

The game was intentionally kept simple and lightweight, with responsive gameplay for both desktop and mobile devices.

---

## 🎮 Gameplay

The player starts with **5 lives**.

Stars continuously fall from the top of the screen. Move the spaceship underneath a star to catch it and earn **10 points**.

At the same time, asteroids fall as obstacles. The player needs to avoid them because an asteroid collision also costs one life.

### Scoring & Lives

| Action | Result |
|--------|--------|
| Catch a star | **+10 points** |
| Miss a star | **-1 life** |
| Hit an asteroid | **-1 life** |

The game ends when all **5 lives** are lost. The final score is then displayed on the Game Over screen.

---

## 🕹️ Controls

### Desktop

Use the keyboard arrow keys:

- `←` Move left
- `→` Move right

Move the spaceship horizontally to catch falling stars and avoid asteroids.

### 📱 Mobile

The game supports touch controls.

Simply touch and drag horizontally across the game screen. The spaceship follows your horizontal touch position, allowing the game to be played without a keyboard on phones and tablets.

---

## 🏆 Difficulty Levels

The game offers three difficulty levels:

- **Easy** - slower gameplay with a lower star spawn rate.
- **Medium** - faster stars and a higher spawn rate.
- **Hard** - the fastest and most challenging setting.

The selected difficulty changes the falling-star speed and spawn rate.

---

## 🏅 High Scores

High scores are stored locally in the browser using **localStorage**.

Each difficulty level maintains its own high score:

- Easy
- Medium
- Hard

This means the high score for one difficulty does not overwrite the high score of another.

High scores remain available as long as the browser's local storage data is not cleared.

---

## 📱 Responsive Design

The game uses Phaser's responsive scaling system to adapt to different screen sizes.

It supports:

- Desktop monitors
- Laptop screens
- Tablets
- Mobile phones
- Different browser window sizes

The spaceship is restricted to the visible game area so it cannot move outside the screen.

Mobile touch controls are also provided so gameplay does not depend on keyboard input.

---

## 🛠️ Built With

- **Phaser 3.90**
- **JavaScript**
- **HTML5**
- **CSS**
- **LocalStorage**

Phaser handles the game's rendering, input, physics, animations, scene management, and responsive scaling.

---

## 📦 Project Structure

The project contains the complete source code along with the final AppLovin playable build.

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
## 🚀 Running the Project Locally

### Prerequisites

Before running the source project, make sure the following are installed on your system:

- **Node.js** (LTS version recommended)
- **npm** (included with Node.js)
- A modern web browser such as **Google Chrome, Microsoft Edge, or Firefox**

You can verify that Node.js and npm are installed by opening a terminal and running:

```bash
node --version
npm --version
📥 Download the Project

You can download the project directly from GitHub:

Open the GitHub repository.
Click the Code button.
Select Download ZIP.
Extract the downloaded ZIP file.
Open the extracted project folder in Visual Studio Code or another code editor.
Open a terminal inside the project folder.
📦 Install Dependencies

The node_modules folder is intentionally not included in the repository because it contains generated dependency files and can make the project unnecessarily large.

After extracting the project, run:

npm install

This reads the dependencies listed in package.json and automatically creates the required node_modules folder.

You only need to run npm install after downloading the project for the first time, or whenever the project's dependencies are updated.

▶️ Run the Game

After installing the dependencies, start the project using the command defined in package.json.

For example, if the project contains a start script:

npm start

If the project uses a different script, check the scripts section of package.json and run the corresponding command.

Once the local development server starts, open the URL provided by the server in your browser.

🎮 Running the AppLovin Build

If you only want to play the final game and do not need the source project or development environment, use the standalone HTML file located in the dist folder:

dist/Star-Catcher-AppLovin-Single-HTML.html

The AppLovin build is self-contained and does not require:

Node.js
npm
node_modules
A development server
The original source files

Simply open the single HTML file in a compatible browser or use it as the final playable build.


### Ek important distinction

README mein ab **2 clear paths** hain:

**Source Project:**  
`Download ZIP → Extract → npm install → npm start`

**Final Playable:**  
`dist/Star-Catcher-AppLovin-Single-HTML.html` → directly use/play

Is se evaluator ko confusion nahi hoga ke `npm install` AppLovin HTML ke liye required hai. **Nahi hai.** `n
