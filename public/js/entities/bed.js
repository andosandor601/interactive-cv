import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadBed() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawBed(context) {
        sprite.draw('bed', context, this.pos.x, this.pos.y);
    }

    return createItem(drawBed);
}