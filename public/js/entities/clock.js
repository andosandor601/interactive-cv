import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadClock() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawClock(context) {
        sprite.draw('clock', context, this.pos.x, this.pos.y);
    }

    return createItem(drawClock);
}