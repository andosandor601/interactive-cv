import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadBeer() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawBeer(context) {
        sprite.draw('beer', context, this.pos.x, this.pos.y);
    }

    return createItem(drawBeer);
}