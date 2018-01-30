import TileResolver from "../tileResolver.js";

export function createSpriteLayer(entities, width = 320, height = 240) {
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteBufferContext = spriteBuffer.getContext('2d');

    return function drawSpriteLayer(context) {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height);
            entity.draw(spriteBufferContext);

            context.drawImage(spriteBuffer, 0, 0);
        });
    };
}