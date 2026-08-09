class GameOverScene extends Phaser.Scene {

    constructor() {
        super("GameOverScene");
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.difficulty = data.difficulty || "Easy";
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        const centerX = width / 2;
        const centerY = height / 2;

        this.cameras.main.setBackgroundColor("#07111F");

        for (let i = 0; i < 100; i++) {
            this.add.circle(
                Phaser.Math.Between(0, width),
                Phaser.Math.Between(0, height),
                Phaser.Math.Between(1, 2),
                0xffffff,
                Phaser.Math.FloatBetween(0.4, 1)
            );
        }

        const highScoreKey = "starCatcherHighScore_" + this.difficulty;
        const highScore = Number(localStorage.getItem(highScoreKey)) || 0;

        const titleSize = Math.max(32, Math.min(width * 0.11, 58));

        this.add.text(centerX, centerY - height * 0.25, "GAME OVER", {
            fontSize: `${titleSize}px`,
            color: "#ff4444",
            fontStyle: "bold",
            align: "center",
        }).setOrigin(0.5);

        const difficultySize = Math.max(16, Math.min(width * 0.045, 24));

        this.add.text(centerX, centerY - height * 0.14, this.difficulty.toUpperCase() + " MODE", {
            fontSize: `${difficultySize}px`,
            color: "#FFD700",
            fontStyle: "bold",
            align: "center",
        }).setOrigin(0.5);

        const scoreSize = Math.max(22, Math.min(width * 0.065, 34));

        this.add.text(centerX, centerY - height * 0.04, "Final Score : " + this.finalScore, {
            fontSize: `${scoreSize}px`,
            color: "#ffffff",
            align: "center",
        }).setOrigin(0.5);

        const highScoreSize = Math.max(19, Math.min(width * 0.055, 28));

        this.add.text(centerX, centerY + height * 0.06, "High Score : " + highScore, {
            fontSize: `${highScoreSize}px`,
            color: "#FFD700",
            fontStyle: "bold",
            align: "center",
        }).setOrigin(0.5);

        const buttonSize = Math.max(20, Math.min(width * 0.06, 30));

        const btn = this.add.text(centerX, centerY + height * 0.22, "PLAY AGAIN", {
            fontSize: `${buttonSize}px`,
            backgroundColor: "#2ecc71",
            color: "#07111F",
            fontStyle: "bold",
            padding: {
                x: Math.max(15, width * 0.035),
                y: Math.max(8, height * 0.018),
            },
            align: "center",
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        btn.on("pointerover", () => {
            btn.setScale(1.08);
        });

        btn.on("pointerout", () => {
            btn.setScale(1);
        });

        btn.on("pointerdown", () => {
            this.scene.start("MenuScene");
        });

        this.scale.on("resize", this.handleResize, this);
    }

    handleResize(gameSize) {
        const width = gameSize.width;
        const height = gameSize.height;
    }

}