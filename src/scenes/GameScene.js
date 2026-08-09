class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("player", GAME_ASSETS.player);
    this.load.image("star", GAME_ASSETS.star);
    this.load.image("obstacle", GAME_ASSETS.obstacle);
  }

  create() {
    this.gameWidth = this.scale.width;
    this.gameHeight = this.scale.height;

    this.setupDifficulty();
    this.setupGameVariables();

    this.createBackground();
    this.createPlayer();
    this.setupControls();
    this.createStars();
    this.createObstacles();
    this.createScore();
    this.createHearts();

    this.physics.add.overlap(
      this.player,
      this.stars,
      this.catchStar,
      null,
      this,
    );

    this.spawnStar();

    this.starTimer = this.time.addEvent({
      delay: this.difficulty.spawnRate,
      callback: this.spawnStar,
      callbackScope: this,
      loop: true,
    });

    this.scale.on("resize", this.handleResize, this);
  }

  setupDifficulty() {
    this.difficulty = this.registry.get("difficulty") || {
      name: "Easy",
      spawnRate: 1200,
      starSpeed: 220,
    };
  }

  setupGameVariables() {
    this.score = 0;
    this.lives = 5;
    this.playerSpeed = 600;
    this.maxLives = 5;
    this.playerSize = 110;
    this.starSize = 40;
    this.obstacleSize = 50;
    this.playerBottomMargin = 50;
  }

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

  createPlayer() {
    this.player = this.physics.add.sprite(
      this.gameWidth / 2,
      this.gameHeight - this.playerBottomMargin,
      "player",
    );

    this.player.setDisplaySize(this.playerSize, this.playerSize);
    this.player.setCollideWorldBounds(true);
  }

  setupControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.setupTouchControls();
  }

  createStars() {
    this.stars = this.physics.add.group();
  }

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
      delay: this.difficulty.spawnRate * 1.5,
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

  update(_time, delta) {
    this.updatePlayerMovement();
    this.keepPlayerInsideScreen();
    this.updateStars(delta);
  }
  updateLives() {
    this.livesText.setText("❤️ " + this.lives);
  }
  updatePlayerMovement() {
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
  endGame() {
    this.saveHighScore();

    this.scene.start("GameOverScene", {
      score: this.score,
      difficulty: this.difficulty.name,
    });
  }

  updateStars(delta) {
    const seconds = delta / 1000;

    this.stars.getChildren().forEach((star) => {
      if (!star.active) {
        return;
      }

      star.y += this.difficulty.starSpeed * seconds;

      if (star.y > this.gameHeight + 50) {
        star.destroy();
      }
    });

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
  catchStar(player, star) {
    if (!star.active) {
      return;
    }

    star.body.enable = false;

    const x = star.x;
    const y = star.y;

    this.showScorePopup(x, y);
    this.animateCaughtStar(star);
    this.updateScore();
  }
  hitObstacle(player, obstacle) {
    if (!obstacle.active) {
      return;
    }

    obstacle.destroy();

    this.lives--;

    this.updateLives();

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

  keepPlayerInsideScreen() {
    const halfWidth = this.player.displayWidth / 2;

    this.player.x = Phaser.Math.Clamp(
      this.player.x,
      halfWidth,
      this.gameWidth - halfWidth,
    );
  }

  handleResize(gameSize) {
    this.gameWidth = gameSize.width;
    this.gameHeight = gameSize.height;

    this.keepPlayerInsideScreen();
  }

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