import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadFootball() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawFootball(context) {
        sprite.draw('football', context, this.pos.x, this.pos.y);
    }

    return createItem(drawFootball);
}