import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadStarToy() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawStarToy(context) {
        sprite.draw('starToy', context, this.pos.x, this.pos.y);
    }

    return createItem(drawStarToy);
}