import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadBook() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawBook(context) {
        sprite.draw('book', context, this.pos.x, this.pos.y);
    }

    return createItem(drawBook);
}