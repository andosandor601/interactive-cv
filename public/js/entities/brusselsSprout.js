import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadBrusselsSprout() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawBrusselsSprout(context) {
        sprite.draw('brusselsSprout', context, this.pos.x, this.pos.y);
    }

    return createItem(drawBrusselsSprout);
}