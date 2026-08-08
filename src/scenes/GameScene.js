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
    this.lives = 6;

    this.hearts = [];

    this.playerSpeed = 600;

    // Game constants
    this.maxLives = 6;
    this.playerSize = 140;
    this.starSize = 40;
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
      fontSize: "28px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    this.scoreText.setDepth(10);
  }

  // =========================================
  // HEARTS
  // =========================================

  createHearts() {
    const heartSpacing = 38;
    const rightMargin = 45;

    const totalHeartWidth = heartSpacing * (this.maxLives - 1);

    const startX = this.gameWidth - totalHeartWidth - rightMargin;

    for (let i = 0; i < this.maxLives; i++) {
      const heart = this.add.text(startX + i * heartSpacing, 20, "❤️", {
        fontSize: "28px",
      });

      heart.setDepth(10);

      this.hearts.push(heart);
    }
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
  // STAR MOVEMENT
  // =========================================

  updateStars(delta) {
    const seconds = delta / 1000;

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
  }

  // =========================================
  // MISSED STAR / LIVES
  // =========================================

  handleMissedStar() {
    this.lives--;

    const heartIndex = this.lives;

    if (heartIndex >= 0) {
      this.hearts[heartIndex].setText("🤍");
    }

    if (this.lives <= 0) {
      this.scene.start("GameOverScene", {
        score: this.score,
      });
    }
  }

  // =========================================
  // SPAWN STAR
  // =========================================

  spawnStar() {
    const margin = 30;

    const x = Phaser.Math.Between(margin, this.gameWidth - margin);

    const star = this.physics.add.sprite(x, -30, "star");

    star.setDisplaySize(this.starSize, this.starSize);

    star.setDepth(1);

    this.stars.add(star);
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
}
