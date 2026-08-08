class MenuScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }


    create() {

        // =====================================
        // RESPONSIVE SIZE
        // =====================================

        this.gameWidth = this.scale.width;
        this.gameHeight = this.scale.height;


        // =====================================
        // BACKGROUND
        // =====================================

        this.cameras.main.setBackgroundColor("#07111F");

        this.createBackgroundStars();


        // =====================================
        // TITLE
        // =====================================

        this.title = this.add.text(
            0,
            0,
            "⭐ STAR CATCHER ⭐",
            {
                fontSize: this.getFontSize(42, 28),
                color: "#FFD700",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);


        // =====================================
        // SUBTITLE
        // =====================================

        this.subtitle = this.add.text(
            0,
            0,
            "Catch the falling stars!",
            {
                fontSize: this.getFontSize(20, 16),
                color: "#cccccc"
            }
        ).setOrigin(0.5);


        // =====================================
        // DIFFICULTY TITLE
        // =====================================

        this.difficultyTitle = this.add.text(
            0,
            0,
            "SELECT DIFFICULTY",
            {
                fontSize: this.getFontSize(26, 20),
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);


        // =====================================
        // EASY BUTTON
        // =====================================

        this.easy = this.add.text(
            0,
            0,
            "EASY",
            {
                fontSize: this.getFontSize(28, 22),
                color: "#00ff66",
                backgroundColor: "#162B30",
                padding: {
                    left: 30,
                    right: 30,
                    top: 10,
                    bottom: 10
                }
            }
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });


        // =====================================
        // MEDIUM BUTTON
        // =====================================

        this.medium = this.add.text(
            0,
            0,
            "MEDIUM",
            {
                fontSize: this.getFontSize(28, 22),
                color: "#FFD700",
                backgroundColor: "#302A16",
                padding: {
                    left: 25,
                    right: 25,
                    top: 10,
                    bottom: 10
                }
            }
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });


        // =====================================
        // HARD BUTTON
        // =====================================

        this.hard = this.add.text(
            0,
            0,
            "HARD",
            {
                fontSize: this.getFontSize(28, 22),
                color: "#ff5555",
                backgroundColor: "#301616",
                padding: {
                    left: 35,
                    right: 35,
                    top: 10,
                    bottom: 10
                }
            }
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });


        // =====================================
        // CONTROLS
        // =====================================

        this.controls = this.add.text(
            0,
            0,
            "← →  Move Player\n\n⭐  Catch Stars\n\n❤️  You have 6 Lives",
            {
                align: "center",
                fontSize: this.getFontSize(19, 16),
                color: "#ffffff",
                lineSpacing: 8
            }
        ).setOrigin(0.5);


        // =====================================
        // BUTTON EVENTS
        // =====================================

        this.easy.on("pointerdown", () => {

            this.startGame(
                "Easy",
                1000,
                220
            );

        });


        this.medium.on("pointerdown", () => {

            this.startGame(
                "Medium",
                700,
                300
            );

        });


        this.hard.on("pointerdown", () => {

            this.startGame(
                "Hard",
                450,
                400
            );

        });


        // =====================================
        // HOVER EFFECTS
        // =====================================

        this.addHoverEffect(this.easy);
        this.addHoverEffect(this.medium);
        this.addHoverEffect(this.hard);


        // =====================================
        // INITIAL LAYOUT
        // =====================================

        this.updateLayout();


        // =====================================
        // RESPONSIVE RESIZE
        // =====================================

        this.scale.on("resize", this.handleResize, this);
    }


    // =========================================
    // BACKGROUND STARS
    // =========================================

    createBackgroundStars() {

        this.backgroundStars = this.add.group();

        const width = this.scale.width;
        const height = this.scale.height;

        const starCount = Math.max(
            50,
            Math.floor((width * height) / 6000)
        );


        for (let i = 0; i < starCount; i++) {

            const star = this.add.circle(
                Phaser.Math.Between(0, width),
                Phaser.Math.Between(0, height),
                Phaser.Math.Between(1, 2),
                0xffffff
            );

            this.backgroundStars.add(star);
        }
    }


    // =========================================
    // RESPONSIVE FONT SIZE
    // =========================================

    getFontSize(desktopSize, mobileSize) {

        const width = this.scale.width;

        if (width <= 500) {
            return `${mobileSize}px`;
        }

        return `${desktopSize}px`;
    }


    // =========================================
    // RESPONSIVE LAYOUT
    // =========================================

    updateLayout() {

        const width = this.scale.width;
        const height = this.scale.height;


        // =====================================
        // TITLE
        // =====================================

        this.title.setPosition(
            width / 2,
            height * 0.12
        );


        // =====================================
        // SUBTITLE
        // =====================================

        this.subtitle.setPosition(
            width / 2,
            height * 0.19
        );


        // =====================================
        // DIFFICULTY TITLE
        // =====================================

        this.difficultyTitle.setPosition(
            width / 2,
            height * 0.28
        );


        // =====================================
        // EASY
        // =====================================

        this.easy.setPosition(
            width / 2,
            height * 0.37
        );


        // =====================================
        // MEDIUM
        // =====================================

        this.medium.setPosition(
            width / 2,
            height * 0.47
        );


        // =====================================
        // HARD
        // =====================================

        this.hard.setPosition(
            width / 2,
            height * 0.57
        );


        // =====================================
        // CONTROLS
        // =====================================

        this.controls.setPosition(
            width / 2,
            height * 0.78
        );
    }


    // =========================================
    // HANDLE RESIZE
    // =========================================

    handleResize(gameSize) {

        this.gameWidth = gameSize.width;
        this.gameHeight = gameSize.height;


        // Reposition everything
        this.updateLayout();
    }


    // =========================================
    // START GAME
    // =========================================

    startGame(name, spawnRate, starSpeed) {

        this.registry.set(
            "difficulty",
            {
                name: name,
                spawnRate: spawnRate,
                starSpeed: starSpeed
            }
        );


        this.scene.start("GameScene");
    }


    // =========================================
    // BUTTON HOVER
    // =========================================

    addHoverEffect(button) {

        button.on("pointerover", () => {

            this.tweens.add({
                targets: button,
                scale: 1.08,
                duration: 120,
                ease: "Power2"
            });

        });


        button.on("pointerout", () => {

            this.tweens.add({
                targets: button,
                scale: 1,
                duration: 120,
                ease: "Power2"
            });

        });
    }
}