import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadPacifier() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawPacifier(context) {
        sprite.draw('pacifier', context, this.pos.x, this.pos.y);
    }

    return createItem(drawPacifier);
}