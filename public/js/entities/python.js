import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadPython() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawPython(context) {
        sprite.draw('python', context, this.pos.x, this.pos.y);
    }

    return createItem(drawPython);
}