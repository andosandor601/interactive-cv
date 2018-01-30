import TileResolver from "../tileResolver.js";

export function createBackgroundLayer(level, tiles, sprites) {
    const resolver = new TileResolver(tiles);

    const buffer = document.createElement('canvas');
    buffer.width = 320;
    buffer.height = 240;

    const context = buffer.getContext('2d');

    tiles.forEach((tile, x, y) => {
        context.clearRect(0, 0, buffer.width, buffer.length);
        sprites.drawTile(tile.name, context, x, y);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}