import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadCry() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawCry(context) {
        sprite.draw('cry', context, this.pos.x, this.pos.y);
    }

    return createItem(drawCry);
}