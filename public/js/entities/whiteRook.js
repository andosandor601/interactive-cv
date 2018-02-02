import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadWhiteRook() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawWhiteRook(context) {
        sprite.draw('whiteRook', context, this.pos.x, this.pos.y);
    }

    return createItem(drawWhiteRook);
}