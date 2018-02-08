import { loadSpriteSheet } from '../loaders.js';
import { createItem } from '../createItem.js';

export function loadSquareAcademicCap() {
    return loadSpriteSheet("items")
        .then(createItemFactory);
}

function createItemFactory(sprite) {

    function drawSquareAcademicCap(context) {
        sprite.draw('squareAcademicCap', context, this.pos.x, this.pos.y);
    }

    return createItem(drawSquareAcademicCap);
}