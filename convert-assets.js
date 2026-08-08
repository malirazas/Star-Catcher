const fs = require("fs");

function toBase64(filePath) {
    const image = fs.readFileSync(filePath);
    return `data:image/png;base64,${image.toString("base64")}`;
}

const player = toBase64("./assets/player.png");
const star = toBase64("./assets/star.png");

const output = `
// Auto-generated Base64 assets

const GAME_ASSETS = {
    player: "${player}",
    star: "${star}"
};
`;

fs.writeFileSync(
    "./src/assets-base64.js",
    output,
    "utf8"
);

console.log("Base64 assets generated successfully.");