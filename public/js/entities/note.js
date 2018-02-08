import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadNote() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawNote(context) {
        sprite.draw('note', context, this.pos.x, this.pos.y);
    }

    return createItem(drawNote);
}