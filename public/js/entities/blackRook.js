import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadBlackRook() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawBlackRook(context) {
        sprite.draw('blackRook', context, this.pos.x, this.pos.y);
    }

    return createItem(drawBlackRook);
}