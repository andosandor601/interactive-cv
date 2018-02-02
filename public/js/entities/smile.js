import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadSmile() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawSmile(context) {
        sprite.draw('smile', context, this.pos.x, this.pos.y);
    }

    return createItem(drawSmile);
}