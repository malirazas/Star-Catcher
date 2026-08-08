const config = {
    type: Phaser.AUTO,

    width: window.innerWidth,
    height: window.innerHeight,

    backgroundColor: "#081426",

    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },

    audio: {
        noAudio: true
    },

    scene: [
        MenuScene,
        GameScene,
        GameOverScene
    ]
};

new Phaser.Game(config);