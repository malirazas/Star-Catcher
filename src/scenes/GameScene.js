class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  // =========================================
  // PRELOAD
  // =========================================

  preload() {
    this.load.image("player", GAME_ASSETS.player);

    this.load.image("star", GAME_ASSETS.star);

    this.load.image("obstacle", GAME_ASSETS.obstacle);
  }

  // =========================================
  // CREATE
  // =========================================

  create() {
    // Screen size
    this.gameWidth = this.scale.width;
    this.gameHeight = this.scale.height;

    // Game settings
    this.setupDifficulty();
    this.setupGameVariables();

    // Game elements
    this.createBackground();
    this.createPlayer();
    this.setupControls();
    this.createStars();
    this.createObstacles();
    this.createScore();
    this.createHearts();

    // Collision
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.catchStar,
      null,
      this,
    );

    // Start spawning
    this.spawnStar();

    this.starTimer = this.time.addEvent({
      delay: this.difficulty.spawnRate,
      callback: this.spawnStar,
      callbackScope: this,
      loop: true,
    });

    // Responsive screen
    this.scale.on("resize", this.handleResize, this);
  }

  // =========================================
  // DIFFICULTY
  // =========================================

  setupDifficulty() {
    this.difficulty = this.registry.get("difficulty") || {
      name: "Easy",
      spawnRate: 1300,
      starSpeed: 200,
    };
  }

  // =========================================
  // GAME VARIABLES
  // =========================================

  setupGameVariables() {
    this.score = 0;
    this.lives = 5;
    this.playerSpeed = 600;
    // Game constants
    this.maxLives = 5;
    this.playerSize = 120;
    this.starSize = 40;
    this.obstacleSize = 50;
    this.playerBottomMargin = 80;
  }

  // =========================================
  // BACKGROUND
  // =========================================

  createBackground() {
    this.cameras.main.setBackgroundColor("#081426");

    const starCount = 80;

    for (let i = 0; i < starCount; i++) {
      const size = Phaser.Math.Between(1, 2);

      this.add.circle(
        Phaser.Math.Between(0, this.gameWidth),
        Phaser.Math.Between(0, this.gameHeight),
        size,
        0xffffff,
      );
    }
  }

  // =========================================
  // PLAYER
  // =========================================

  createPlayer() {
    this.player = this.physics.add.sprite(
      this.gameWidth / 2,
      this.gameHeight - this.playerBottomMargin,
      "player",
    );

    this.player.setDisplaySize(this.playerSize, this.playerSize);

    this.player.setCollideWorldBounds(true);
  }

  // =========================================
  // CONTROLS
  // =========================================

  setupControls() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.setupTouchControls();
  }

  // =========================================
  // STARS
  // =========================================

  createStars() {
    this.stars = this.physics.add.group();
  }

  // =========================================
  // SCORE
  // =========================================

  createScore() {
    this.scoreText = this.add.text(20, 20, "Score : 0", {
      fontSize: "20px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    this.scoreText.setDepth(10);
  }
  createObstacles() {
    this.obstacles = this.physics.add.group();

    this.obstacleTimer = this.time.addEvent({
      delay: this.difficulty.spawnRate * 3.8,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.overlap(
      this.player,
      this.obstacles,
      this.hitObstacle,
      null,
      this,
    );
  }
  // =========================================
  // HEARTS
  // =========================================

  createHearts() {
    this.livesText = this.add.text(
      this.gameWidth - 25,
      20,
      "❤️ " + this.lives,
      {
        fontSize: "22px",
        color: "#ffffff",
        fontStyle: "bold",
      },
    );

    this.livesText.setOrigin(1, 0).setDepth(10);
  }

  // =========================================
  // UPDATE
  // =========================================

  update(_time, delta) {
    this.updatePlayerMovement();

    this.keepPlayerInsideScreen();

    this.updateStars(delta);
  }
  // =========================================
  // UPDATE LIVES
  // =========================================

  updateLives() {
    this.livesText.setText("❤️ " + this.lives);
  }
  // =========================================
  // PLAYER MOVEMENT
  // =========================================

  updatePlayerMovement() {
    // Touch movement has priority
    if (this.isTouching) {
      return;
    }

    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-this.playerSpeed);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(this.playerSpeed);
    }
  }
  // =========================================
  // END GAME
  // =========================================

  endGame() {
    this.saveHighScore();

    this.scene.start("GameOverScene", {
      score: this.score,
      difficulty: this.difficulty.name,
    });
  }

  // =========================================
  // STAR + OBSTACLE MOVEMENT
  // =========================================

  updateStars(delta) {
    const seconds = delta / 1000;

    // Stars
    this.stars.getChildren().forEach((star) => {
      if (!star.active) {
        return;
      }

      star.y += this.difficulty.starSpeed * seconds;

      if (star.y > this.gameHeight + 80) {
        star.destroy();

        this.handleMissedStar();
      }
    });

    // Obstacles
    this.obstacles.getChildren().forEach((obstacle) => {
      if (!obstacle.active) {
        return;
      }

      obstacle.y += this.difficulty.starSpeed * seconds;

      if (obstacle.y > this.gameHeight + 80) {
        obstacle.destroy();
      }
    });
  }

  // =========================================
  // MISSED STAR / LIVES
  // =========================================

  handleMissedStar() {
    this.lives--;

    this.updateLives();

    if (this.lives <= 0) {
      this.endGame();
    }
  }

  // =========================================
  // SPAWN STAR
  // =========================================

  spawnStar() {
    const margin = 30;
    const minDistance = 120;

    let x;
    let attempts = 0;

    do {
      x = Phaser.Math.Between(margin, this.gameWidth - margin);

      attempts++;
    } while (
      attempts < 20 &&
      this.obstacles
        .getChildren()
        .some(
          (obstacle) =>
            obstacle.active && Math.abs(obstacle.x - x) < minDistance,
        )
    );

    const star = this.physics.add.sprite(x, -30, "star");

    star.setDisplaySize(this.starSize, this.starSize);

    star.setDepth(1);

    this.stars.add(star);
  }
  // =========================================
  // SPAWN OBSTACLE
  // =========================================

  spawnObstacle() {
    const margin = 30;
    const minDistance = 120;

    let x;
    let attempts = 0;

    do {
      x = Phaser.Math.Between(margin, this.gameWidth - margin);

      attempts++;
    } while (
      attempts < 20 &&
      this.stars
        .getChildren()
        .some((star) => star.active && Math.abs(star.x - x) < minDistance)
    );

    const obstacle = this.physics.add.sprite(x, -30, "obstacle");

    obstacle.setDisplaySize(this.obstacleSize, this.obstacleSize);

    obstacle.setDepth(1);

    this.obstacles.add(obstacle);
  }
  // =========================================
  // CATCH STAR
  // =========================================

  catchStar(player, star) {
    if (!star.active) {
      return;
    }

    // Prevent duplicate collision
    star.body.enable = false;

    const x = star.x;
    const y = star.y;

    this.showScorePopup(x, y);
    this.animateCaughtStar(star);
    this.updateScore();
  }
  // =========================================
  // OBSTACLE COLLISION
  // =========================================

  hitObstacle(player, obstacle) {
    if (!obstacle.active) {
      return;
    }

    obstacle.destroy();

    this.lives--;

    this.updateLives();

    // Small hit feedback
    this.tweens.add({
      targets: this.player,
      alpha: 0.3,
      duration: 100,
      yoyo: true,
      repeat: 2,
    });

    if (this.lives <= 0) {
      this.endGame();
    }
  }
  // =========================================
  // SCORE POPUP
  // =========================================

  showScorePopup(x, y) {
    const popup = this.add.text(x, y, "+10", {
      fontSize: "24px",
      color: "#FFD700",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 3,
    });

    popup.setOrigin(0.5);
    popup.setDepth(20);

    this.tweens.add({
      targets: popup,

      y: y - 50,
      alpha: 0,

      duration: 600,

      ease: "Power2",

      onComplete: () => {
        popup.destroy();
      },
    });
  }

  // =========================================
  // STAR CATCH ANIMATION
  // =========================================

  animateCaughtStar(star) {
    this.tweens.add({
      targets: star,

      scale: 1.8,
      alpha: 0,

      duration: 250,

      ease: "Back.easeOut",

      onComplete: () => {
        star.destroy();
      },
    });
  }

  // =========================================
  // SCORE
  // =========================================

  updateScore() {
    this.score += 10;

    this.scoreText.setText("Score : " + this.score);

    this.saveHighScore();

    this.tweens.add({
      targets: this.scoreText,

      scale: 1.3,

      duration: 120,

      yoyo: true,

      ease: "Power2",
    });
  }

  // =========================================
  // TOUCH CONTROLS
  // =========================================

  setupTouchControls() {
    this.isTouching = false;

    this.input.on("pointerdown", (pointer) => {
      if (!pointer.wasTouch) {
        return;
      }

      this.isTouching = true;
    });

    this.input.on("pointermove", (pointer) => {
      if (!this.isTouching || !pointer.wasTouch) {
        return;
      }

      this.player.x = pointer.x;

      this.keepPlayerInsideScreen();
    });

    this.input.on("pointerup", () => {
      this.isTouching = false;
    });

    this.input.on("pointerupoutside", () => {
      this.isTouching = false;
    });
  }

  // =========================================
  // KEEP PLAYER INSIDE SCREEN
  // =========================================

  keepPlayerInsideScreen() {
    const halfWidth = this.player.displayWidth / 2;

    this.player.x = Phaser.Math.Clamp(
      this.player.x,
      halfWidth,
      this.gameWidth - halfWidth,
    );
  }

  // =========================================
  // RESPONSIVE RESIZE
  // =========================================

  handleResize(gameSize) {
    this.gameWidth = gameSize.width;
    this.gameHeight = gameSize.height;

    this.keepPlayerInsideScreen();
  }

  // =========================================
  // HIGH SCORE
  // =========================================

  getHighScore() {
    const key = "starCatcherHighScore_" + this.difficulty.name;

    return Number(localStorage.getItem(key)) || 0;
  }
  saveHighScore() {
    const key = "starCatcherHighScore_" + this.difficulty.name;

    const highScore = this.getHighScore();

    if (this.score > highScore) {
      localStorage.setItem(key, this.score);
    }
  }
}
