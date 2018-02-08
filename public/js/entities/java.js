import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadJava() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawJava(context) {
        sprite.draw('java', context, this.pos.x, this.pos.y);
    }

    return createItem(drawJava);
}